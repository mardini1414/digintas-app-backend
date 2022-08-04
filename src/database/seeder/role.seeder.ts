import { createOne } from './seeder';
import { roleFactory } from '../factory/role.factory';

createOne(() => {
  roleFactory();
});
