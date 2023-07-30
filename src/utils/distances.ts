const EARTH_RADIUS = 6371; // km

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS * c * 1000; // Distance in m
  return d;
}

export function getRoughDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const d = getDistance(lat1, lon1, lat2, lon2);

  return `${Math.round(d / 50) * 10}m 以内`;
}
