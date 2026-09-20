// GET /api/user-info
export const mockUserInfo = {
  profile: {
    firstName: "Sophie",
    lastName: "Martin",
    createdAt: "2025-01-01",
    age: 32,
    weight: 60,
    height: 165,
    profilePicture: "http://localhost:8000/images/sophie.jpg"
  },
  statistics: {
    totalDistance: "2250.2",
    totalSessions: 348,
    totalDuration: 14625
  }
};

// GET /api/user-activity?startWeek=2026-09-01&endWeek=2026-09-30
export const mockUserActivity = [
  {
    date: "2026-09-04",
    distance: 4.5,
    duration: 29,
    heartRate: { min: 144, max: 179, average: 167 },
    caloriesBurned: 325
  },
  {
    date: "2026-09-07",
    distance: 8.8,
    duration: 57,
    heartRate: { min: 139, max: 179, average: 162 },
    caloriesBurned: 615
  },
  {
    date: "2026-09-14",
    distance: 6.2,
    duration: 40,
    heartRate: { min: 142, max: 177, average: 164 },
    caloriesBurned: 440
  }
];

/**
 * Identifiants
 * - sophiemartin / password123
 * - emmaleroy / password789
 * - marcdubois / password456
 */