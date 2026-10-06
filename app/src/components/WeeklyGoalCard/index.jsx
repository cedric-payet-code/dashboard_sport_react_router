import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getCurrentWeekRange } from "../../utils/activityAgregator";
import styles from "./style.module.css";

const DEFAULT_WEEKLY_GOAL = 6; // utilisé si l'utilisateur n'a pas d'objectif dans l'API

const COLORS = ["#0B23F4", "#b6bdfc"];

export default function WeeklyGoalCard() {
  const { fetchActivity } = useUserActivity();
  const { userInfo } = useUserInfo();
  const weeklyGoal = userInfo?.weeklyGoal ?? DEFAULT_WEEKLY_GOAL;
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getCurrentWeekRange();
      const sessions = await fetchActivity(start, end);
      setCompleted(sessions.length);
    }
    loadData();
  }, []);

  const remaining = Math.max(weeklyGoal - completed, 0);
  const data = [
    { name: "Réalisées", value: completed },
    { name: "Restantes", value: remaining }
  ];

  // Rotation pour centrer la part "réalisées" à gauche (200°, face à sa légende) ;
  // la part "restants" se retrouve alors à droite
  const completedAngle = (360 * Math.min(completed, weeklyGoal)) / weeklyGoal;
  const startAngle = 200 + completedAngle / 2;

  return (
    <div className={styles.card}>
      <p className={styles.goal}>
        <span className={styles.count}>x{completed}</span>
        <span className={styles.target}>sur objectif de {weeklyGoal}</span>
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
