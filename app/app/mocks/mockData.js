/**
 * Données simulées utilisées quand VITE_USE_MOCK=true.
 * Elles reproduisent le format des réponses de l'API (voir app/services/api.js).
 */

// Identifiants acceptés par le mock (mêmes que ceux de l'API)
export const MOCK_CREDENTIALS = {
  username: "sophiemartin",
  password: "password123"
};

// POST /api/login
export const mockLoginResponse = {
  token: "mock-token",
  userId: "user123"
};

// GET /api/user-info
export const mockUserInfo = {
  profile: {
    firstName: "Sophie",
    lastName: "Martin",
    createdAt: "2025-01-01",
    age: 32,
    gender: "female",
    weight: 60,
    height: 165,
    profilePicture: "http://localhost:8000/images/sophie.jpg"
  },
  statistics: {
    totalDistance: "2250.2",
    totalSessions: 348,
    totalDuration: 14625
  },
  weeklyGoal: 2
};

// Séances exprimées en "jours avant aujourd'hui", pour que les graphiques
// (semaine en cours, 4 dernières semaines...) aient toujours des données
const SESSIONS = [
  { daysAgo: 1, distance: 5.8, duration: 38, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 422 },
  { daysAgo: 3, distance: 3.2, duration: 20, heartRate: { min: 148, max: 184, average: 171 }, caloriesBurned: 248 },
  { daysAgo: 6, distance: 6.4, duration: 42, heartRate: { min: 140, max: 176, average: 163 }, caloriesBurned: 468 },
  { daysAgo: 9, distance: 4.5, duration: 29, heartRate: { min: 144, max: 179, average: 167 }, caloriesBurned: 325 },
  { daysAgo: 12, distance: 8.8, duration: 57, heartRate: { min: 139, max: 179, average: 162 }, caloriesBurned: 615 },
  { daysAgo: 15, distance: 6.2, duration: 40, heartRate: { min: 142, max: 177, average: 164 }, caloriesBurned: 440 },
  { daysAgo: 19, distance: 7.1, duration: 46, heartRate: { min: 141, max: 180, average: 165 }, caloriesBurned: 512 },
  { daysAgo: 23, distance: 5.0, duration: 33, heartRate: { min: 143, max: 178, average: 164 }, caloriesBurned: 360 },
  { daysAgo: 26, distance: 9.4, duration: 62, heartRate: { min: 138, max: 181, average: 161 }, caloriesBurned: 676 },
  { daysAgo: 30, distance: 4.0, duration: 26, heartRate: { min: 146, max: 182, average: 169 }, caloriesBurned: 290 },
  { daysAgo: 34, distance: 6.9, duration: 45, heartRate: { min: 140, max: 177, average: 163 }, caloriesBurned: 497 },
  { daysAgo: 38, distance: 5.5, duration: 36, heartRate: { min: 142, max: 179, average: 165 }, caloriesBurned: 398 }
];

function daysAgoToISO(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

// GET /api/user-activity
export const mockUserActivity = SESSIONS
  .map(({ daysAgo, ...session }) => ({ date: daysAgoToISO(daysAgo), ...session }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));
