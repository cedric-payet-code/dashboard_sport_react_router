import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../hooks/useUserActivity";
import { getCurrentWeekRange } from "../utils/activityAgregator";
import styles from "./WeeklyGoalCard.module.css";

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

  // Rotation pour centrer la part "réalisées" à gauche (200°, face à sa légende) ;
  // la part "restants" se retrouve alors à droite
  const completedAngle = (360 * Math.min(completed, WEEKLY_GOAL)) / WEEKLY_GOAL;
  const startAngle = 200 + completedAngle / 2;

  return (
    <div className={styles.card}>
      <p className={styles.goal}>
        <span className={styles.count}>x{completed}</span>
        <span className={styles.target}>sur objectif de {WEEKLY_GOAL}</span>
      </p>
      <p className={styles.subtitle}>Courses hebdomadaire réalisées</p>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              stroke="none"
              innerRadius={50}
              outerRadius={100}
              startAngle={startAngle}
              endAngle={startAngle - 360}
              isAnimationActive={false}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <span className={`${styles.label} ${styles.remaining}`}>
          <span className={styles.dot} style={{ background: COLORS[1] }} />
          {remaining} restants
        </span>
        <span className={`${styles.label} ${styles.completed}`}>
          <span className={styles.dot} style={{ background: COLORS[0] }} />
          {completed} réalisées
        </span>
      </div>
    </div>
  );
}
