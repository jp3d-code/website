import * as migration_20260611_010637 from './20260611_010637';
import * as migration_20260615_162547 from './20260615_162547';
import * as migration_20260713_202442 from './20260713_202442';
import * as migration_20260714_140746 from './20260714_140746';

export const migrations = [
  {
    up: migration_20260611_010637.up,
    down: migration_20260611_010637.down,
    name: '20260611_010637',
  },
  {
    up: migration_20260615_162547.up,
    down: migration_20260615_162547.down,
    name: '20260615_162547',
  },
  {
    up: migration_20260713_202442.up,
    down: migration_20260713_202442.down,
    name: '20260713_202442',
  },
  {
    up: migration_20260714_140746.up,
    down: migration_20260714_140746.down,
    name: '20260714_140746'
  },
];
