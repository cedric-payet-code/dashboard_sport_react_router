export function formatHeight(heightInCm) {
  const meters = Math.floor(heightInCm / 100);
  const centimeters = String(heightInCm % 100).padStart(2, "0");
  return `${meters}m${centimeters}`;
}

export function formatTotalDuration(totalDurationInMin) {
  const hours = Math.floor(totalDurationInMin / 60);
  const minutes = totalDurationInMin % 60;
  return { hours, minutes: String(minutes).padStart(2, "0") };
}

export function formatGender(gender) {
  const genders = { female: "Femme", male: "Homme" };
  return genders[gender] ?? "Non renseigné";
}
