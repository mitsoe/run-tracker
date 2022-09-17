export interface Run {
  distance: number;
  // TODO: remove minute + seconds and use only time
  time?: number;
  minutes: number;
  seconds: number;
  heartbeat: number;
  date: Date;
}
