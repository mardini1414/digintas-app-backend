import { hrFactory } from '../factory/hr.factory';
import { createMany } from './seeder';

createMany(100, (number: number) => {
  hrFactory(number);
});
