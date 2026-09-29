// app/src/components/HeartRateChart.jsx
import { useState, useEffect } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../hooks/useUserActivity";
import { getWeekRange, mapSessionsToWeekDays } from "../utils/activityAgregator";

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
      setChartData(mapSessionsToWeekDays(sessions, start));
    }
    loadData();
  }, [weekOffset]);

  const maxAverage = chartData.length
    ? Math.round(chartData.reduce((sum, d) => sum + d.average, 0) / chartData.length)
    : 0;

  return (
    <div>
      <div>
        <span>{maxAverage} BPM</span>
        <div>
          <button onClick={() => setWeekOffset(o => o + 1)}>‹</button>
          <span>{range ? formatRange(range.start, range.end) : ""}</span>
          <button onClick={() => setWeekOffset(o => Math.max(0, o - 1))}>›</button>
        </div>
      </div>
      <p>Fréquence cardiaque moyenne</p>

      <ResponsiveContainer width="60%" height={250}>
        <ComposedChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis domain={[130, 187]} />
          <Bar dataKey="min" fill="#f4c7c0" barSize={12} />
          <Bar dataKey="max" fill="#ff3b1a" barSize={12} />
          <Line dataKey="average" stroke="#b6bdfc" dot={{ fill: "#2c2ce0" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatRange(start, end) {
  const opts = { day: "numeric", month: "long" };
  return `${new Date(start).toLocaleDateString("fr-FR", opts)} - ${new Date(end).toLocaleDateString("fr-FR", opts)}`;
}