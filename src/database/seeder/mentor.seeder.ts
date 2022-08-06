import { createMany } from './seeder';
import { mentorFactory } from '../factory/mentor.factory';

createMany(500, (number: number) => {
  mentorFactory(number);
});
