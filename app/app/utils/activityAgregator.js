function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

export function getFourWeeksRange(weekOffset = 0) {
  const today = new Date();
  const endMonday = getMonday(today);
  endMonday.setDate(endMonday.getDate() - 7);
  endMonday.setDate(endMonday.getDate() - weekOffset * 28);

  const startMonday = new Date(endMonday);
  startMonday.setDate(startMonday.getDate() - 21);

  return { start: toISO(startMonday), end: toISO(endMonday) };
}

export function aggregateByWeek(sessions, rangeStart) {
  const start = new Date(rangeStart);
  const weeks = [0, 0, 0, 0];

  sessions.forEach(session => {
    const sessionDate = new Date(session.date);
    const diffDays = Math.floor((sessionDate - start) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(diffDays / 7);

    if (weekIndex >= 0 && weekIndex < 4) {
      weeks[weekIndex] += session.distance;
    }
  });

  return weeks.map((total, i) => ({
    week: `S${i + 1}`,
    km: Math.round(total * 10) / 10
  }));
}

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export function getWeekRange(weekOffset = 0) {
  const today = new Date();
  const monday = getMonday(today);
  monday.setDate(monday.getDate() - 7);
  monday.setDate(monday.getDate() - weekOffset * 7);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return { start: toISO(monday), end: toISO(sunday) };
}

export function mapSessionsToWeekDays(sessions, weekStart) {
  const start = new Date(weekStart);

  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const isoDate = toISO(currentDate);

    const session = sessions.find(s => s.date === isoDate);

    return {
      day: DAYS[currentDate.getDay()],
      min: session ? session.heartRate.min : 0,
      max: session ? session.heartRate.max : 0,
      average: session ? session.heartRate.average : 0
    };
  });
}

export function getCurrentWeekRange() {
  const monday = getMonday(new Date());
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  return { start: toISO(monday), end: toISO(sunday) };
}