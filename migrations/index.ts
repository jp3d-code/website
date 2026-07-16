import * as migration_20260716_203550 from "./20260716_203550";

export const migrations = [
  {
    up: migration_20260716_203550.up,
    down: migration_20260716_203550.down,
    name: "20260716_203550",
  },
];
