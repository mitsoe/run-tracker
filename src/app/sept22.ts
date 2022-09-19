import { Run } from "./models/run";
import { addTime } from "./utils/time";

export const sept22: Run[] = [
  {
    distance: 2.65,
    time: addTime(20, 5),
    heartbeat: 143,
    date: new Date(2022, 8, 7)
  },
  {
    distance: 3.19,
    time: addTime(25, 3),
    heartbeat: 144,
    date: new Date(2022, 8, 9)
  },
  {
    distance: 3.59,
    time: addTime(30, 4),
    heartbeat: 147,
    date: new Date(2022, 8, 13)
  },
  {
    distance: 2.22,
    time: addTime(15, 3),
    heartbeat: 160,
    date: new Date(2022, 8, 13)
  },
  {
    distance: 4.6,
    time: addTime(30, 3),
    heartbeat: 159,
    date: new Date(2022, 8, 16)
  },
  {
    distance: 4.63,
    time: addTime(30, 4),
    heartbeat: 160,
    date: new Date(2022, 8, 19)
  }
]
