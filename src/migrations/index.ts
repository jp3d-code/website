import * as migration_20260611_010637 from './20260611_010637';
import * as migration_20260615_162547 from './20260615_162547';

export const migrations = [
  {
    up: migration_20260611_010637.up,
    down: migration_20260611_010637.down,
    name: '20260611_010637',
  },
  {
    up: migration_20260615_162547.up,
    down: migration_20260615_162547.down,
    name: '20260615_162547'
  },
];
