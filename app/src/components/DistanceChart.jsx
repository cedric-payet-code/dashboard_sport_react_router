import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../hooks/useUserActivity";
import { getFourWeeksRange, aggregateByWeek } from "../utils/activityAgregator";

export default function DistanceChart() {
  const { fetchActivity } = useUserActivity();
  const [weekOffset, setWeekOffset] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getFourWeeksRange(weekOffset);
      const sessions = await fetchActivity(start, end);
      setChartData(aggregateByWeek(sessions, start));
    }
    loadData();
  }, [weekOffset]);

  const average = chartData.length
    ? Math.round(chartData.reduce((sum, w) => sum + w.km, 0) / chartData.length)
    : 0;

  return (
    <div>
      <div>
        <span>{average}km en moyenne</span>
      </div>
      <ResponsiveContainer width="40%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Bar dataKey="km" fill="#a6b1f5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}