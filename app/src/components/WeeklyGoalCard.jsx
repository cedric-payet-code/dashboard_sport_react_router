import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../hooks/useUserActivity";
import { getCurrentWeekRange } from "../utils/activityAgregator";

const WEEKLY_GOAL = 6; // à remplacer si l'API fournit cette valeur un jour

const COLORS = ["#0B23F4", "#b6bdfc"];

export default function WeeklyGoalCard() {
  const { fetchActivity } = useUserActivity();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getCurrentWeekRange();
      const sessions = await fetchActivity(start, end);
      setCompleted(sessions.length);
    }
    loadData();
  }, []);

  const remaining = Math.max(WEEKLY_GOAL - completed, 0);
  const data = [
    { name: "Réalisées", value: completed },
    { name: "Restantes", value: remaining }
  ];

  return (
    <div>
      <p>
        <strong>x{completed}</strong> sur objectif de {WEEKLY_GOAL}
      </p>
      <p>Courses hebdomadaire réalisées</p>

      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div>
        <span style={{ color: COLORS[0] }}>● {completed} réalisées</span>
        <span style={{ color: COLORS[1] }}>● {remaining} restants</span>
      </div>
    </div>
  );
}