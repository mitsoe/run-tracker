import { Run } from "./models/run";
import { addTime } from "./utils/time";

export const oct22: Run[] = [
  {
    distance: 4.00,
    time: addTime(20, 3),
    heartbeat: 173,
    date: new Date(2022, 9, 4)
  }
]
