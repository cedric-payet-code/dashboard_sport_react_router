const MS_PER_DAY = 1000 * 60 * 60 * 24; // les dates JavaScript se soustraient en millisecondes

export function calculateTotalCaloriesBurned(userActivity) {
  return userActivity.reduce((total, activity) => total + activity.caloriesBurned, 0);
}

export function calculateRestDays(createdAt, sessions) {
  const startDate = new Date(createdAt);
  const today = new Date();

  const totalDays = Math.floor((today - startDate) / MS_PER_DAY);
  const activeDays = new Set(sessions.map(session => session.date)).size;

  return totalDays - activeDays;
}
