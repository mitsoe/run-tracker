export interface Run {
  distance: number;
  time: number;
  heartbeat: number;
  date: Date;
}

export interface RunWithTempo extends Run {
  tempo: number;
}
