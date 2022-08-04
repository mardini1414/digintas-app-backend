import { createMany } from './seeder';
import { mentorFactory } from '../factory/mentor.factory';

createMany(1000, (number: number) => {
  mentorFactory(number);
});
