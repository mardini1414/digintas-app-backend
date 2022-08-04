import { createOne } from './seeder';
import { HeadMasterFactory } from '../factory/head-master.factory';

createOne(() => {
  HeadMasterFactory();
});
