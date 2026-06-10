import * as migration_20260610_180318 from './20260610_180318';

export const migrations = [
  {
    up: migration_20260610_180318.up,
    down: migration_20260610_180318.down,
    name: '20260610_180318'
  },
];
