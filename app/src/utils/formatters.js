export function formatHeight(heightInCm) {
  const meters = Math.floor(heightInCm / 100);
  const centimeters = String(heightInCm % 100).padStart(2, "0");
  return `${meters}m${centimeters}`;
}

export function formatTotalDuration(totalDurationInMin) {
  const hours = Math.floor(totalDurationInMin / 100);
  const minutes = String(totalDurationInMin % 60);
  return { hours, minutes: String(minutes).padStart(2, "0") };
}