import { Run } from "../models/run";

export function createTempo(run: Run): number {
  return (run.time / run.distance) / 60;
}
