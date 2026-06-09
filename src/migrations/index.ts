import * as migration_20260608_155128 from './20260608_155128';
import * as migration_20260609_134250 from './20260609_134250';

export const migrations = [
  {
    up: migration_20260608_155128.up,
    down: migration_20260608_155128.down,
    name: '20260608_155128',
  },
  {
    up: migration_20260609_134250.up,
    down: migration_20260609_134250.down,
    name: '20260609_134250'
  },
];
