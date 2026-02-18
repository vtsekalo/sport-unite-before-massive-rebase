export function getZoomForRadius(
  radiusMeters: number,
  latitude: number,
  mapWidthPx: number,
  mapHeightPx: number,
): number {
  const EARTH_CIRCUMFERENCE = 40_075_016.686;
  const minDimension = Math.min(mapWidthPx, mapHeightPx);
  const diameter = radiusMeters * 2;

  return Math.log2(
    (EARTH_CIRCUMFERENCE *
      Math.cos((latitude * Math.PI) / 180) *
      minDimension) /
      (diameter * 256),
  );
}
