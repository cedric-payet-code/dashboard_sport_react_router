import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../../hooks/useUserActivity";
import { getFourWeeksRange, aggregateByWeek } from "../../utils/activityAgregator";
import styles from "./style.module.css";

export default function DistanceChart() {
  const { fetchActivity } = useUserActivity();
  const [weekOffset, setWeekOffset] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getFourWeeksRange(weekOffset);
      setRange({ start, end });
      const sessions = await fetchActivity(start, end);
      setChartData(aggregateByWeek(sessions, start));
    }
    loadData();
  }, [weekOffset]);

  const average = chartData.length
    ? Math.round(chartData.reduce((sum, w) => sum + w.km, 0) / chartData.length)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.average}>{average}km en moyenne</span>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(o => o + 1)}
            aria-label="Période précédente"
          >
            ‹
          </button>
          <span className={styles.range}>{range ? formatRange(range.start, range.end) : ""}</span>
          <button
            className={styles.navButton}
            onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
            disabled={weekOffset === 0}
            aria-label="Période suivante"
          >
            ›
          </button>
        </div>
      </div>
      <p className={styles.subtitle}>Total des kilomètres 4 dernières semaines</p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F2F3FF" />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={{ stroke: "#707070" }}
            tick={{ fill: "#707070", fontSize: 12 }}
            tickMargin={12}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "#707070" }}
            tick={{ fill: "#707070", fontSize: 10 }}
            tickCount={4}
          />
          <Tooltip
            cursor={false}
            content={<DistanceTooltip rangeStart={range?.start} />}
          />
          <Legend
            align="left"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#707070", paddingTop: 10, marginLeft: 40 }}
            formatter={value => <span style={{ color: "#707070" }}>{value}</span>}
          />
          <Bar dataKey="km" name="Km" fill="#7987FF" barSize={14} radius={[7, 7, 7, 7]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function DistanceTooltip({ active, payload, label, rangeStart }) {
  if (!active || !payload?.length || !rangeStart) return null;

  // label = "S1".."S4" -> index de la semaine dans la période
  const weekIndex = Number(label.slice(1)) - 1;
  const monday = new Date(rangeStart);
  monday.setDate(monday.getDate() + weekIndex * 7);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const format = date =>
    date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }).replace("/", ".");
  const km = payload[0].value.toLocaleString("fr-FR");

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipDates}>{format(monday)} au {format(sunday)}</span>
      <span className={styles.tooltipValue}>{km} km</span>
    </div>
  );
}

function formatRange(start, end) {
  const opts = { day: "numeric", month: "short" };
  // end = lundi de la dernière semaine -> on affiche jusqu'au dimanche
  const lastDay = new Date(end);
  lastDay.setDate(lastDay.getDate() + 6);
  const format = date => new Date(date).toLocaleDateString("fr-FR", opts).replace(".", "");
  return `${format(start)} - ${format(lastDay)}`;
}
