
export function calculateTotalCaloriesBurned(userActivity) {
  return userActivity.reduce((total, activity) => total + activity.caloriesBurned, 0);
}

export function calculateRestDays(createdAt, sessions) {
  const startDate = new Date(createdAt);
  const today = new Date();

  const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  const activeDays = new Set(sessions.map(session => session.date)).size;

  return totalDays - activeDays;
}