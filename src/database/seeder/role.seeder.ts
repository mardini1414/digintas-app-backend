import { create } from './seeder';
import { roleFactory } from '../factory/role.factory';

create(() => {
  roleFactory();
});
