import { Run } from "../models/run";

export function runToTime(run: Run): number {
  return (run.minutes * 60) + run.seconds;
}
