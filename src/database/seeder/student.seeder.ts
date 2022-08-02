import { createMany } from './seeder';
import { studentFactory } from '../factory/sudent.factory';

createMany(1000, (number: number) => {
  studentFactory(number);
});
