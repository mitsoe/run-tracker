export function createTempo(seconds: number, distance: number): number {
  return (seconds / distance) / 60;
}
