// app/src/components/HeartRateChart.jsx
import { useState, useEffect } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../hooks/useUserActivity";
import { getWeekRange, mapSessionsToWeekDays } from "../utils/activityAgregator";
import styles from "./HeartRateChart.module.css";

export default function HeartRateChart() {
  const { fetchActivity } = useUserActivity();
  const [weekOffset, setWeekOffset] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getWeekRange(weekOffset);
      setRange({ start, end });
      const sessions = await fetchActivity(start, end);
      // Jours sans séance -> null pour ne rien dessiner (0 sortirait du domaine 130-187)
      const days = mapSessionsToWeekDays(sessions, start).map(d => ({
        day: d.day,
        min: d.min || null,
        max: d.max || null,
        average: d.average || null
      }));
      setChartData(days);
    }
    loadData();
  }, [weekOffset]);

  const daysWithSession = chartData.filter(d => d.average);
  const average = daysWithSession.length
    ? Math.round(daysWithSession.reduce((sum, d) => sum + d.average, 0) / daysWithSession.length)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.average}>{average} BPM</span>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(o => o + 1)}
            aria-label="Semaine précédente"
          >
            ‹
          </button>
          <span className={styles.range}>{range ? formatRange(range.start, range.end) : ""}</span>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
            disabled={weekOffset === 0}
            aria-label="Semaine suivante"
          >
            ›
          </button>
        </div>
      </div>
      <p className={styles.subtitle}>Fréquence cardiaque moyenne</p>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid vertical={false} stroke="#F2F3FF" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: "#707070" }}
            tick={{ fill: "#707070", fontSize: 12 }}
            tickMargin={12}
          />
          <YAxis
            domain={[130, 187]}
            ticks={[130, 145, 160, 187]}
            tickLine={false}
            axisLine={{ stroke: "#707070" }}
            tick={{ fill: "#707070", fontSize: 10 }}
          />
          <Legend
            align="left"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: 10, marginLeft: 40 }}
            content={<HeartRateLegend />}
          />
          <Bar dataKey="min" name="Min" fill="#FCC1B6" barSize={14} radius={[7, 7, 7, 7]} />
          <Bar dataKey="max" name="Max BPM" fill="#F4320B" barSize={14} radius={[7, 7, 7, 7]} />
          <Line
            type="monotone"
            dataKey="average"
            name="Moy. BPM"
            stroke="#E3E6FF"
            strokeWidth={3}
            dot={{ r: 3, fill: "#0B23F4", stroke: "none" }}
            activeDot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function HeartRateLegend({ payload }) {
  if (!payload?.length) return null;

  return (
    <ul className={styles.legend}>
      {payload.map(entry => (
        <li key={entry.dataKey} className={styles.legendItem}>
          {entry.type === "line" ? (
            // Point bleu traversé par un trait, comme la courbe du graphique
            <svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
              <line x1="0" y1="4" x2="16" y2="4" stroke="#B6BDFC" strokeWidth="1.5" />
              <circle cx="8" cy="4" r="3.5" fill="#0B23F4" />
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
              <circle cx="4" cy="4" r="4" fill={entry.color} />
            </svg>
          )}
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

function formatRange(start, end) {
  const opts = { day: "2-digit", month: "short" };
  const format = date => new Date(date).toLocaleDateString("fr-FR", opts).replace(".", "");
  return `${format(start)} - ${format(end)}`;
}
