import { Run } from "../models/run";

export function addTime(minutes: number, seconds: number): number {
  return (minutes * 60) + seconds;
}
