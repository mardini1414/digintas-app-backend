import { Roles } from '../../users/role/role.enum';
import { Role } from '../../users/entities/role.entity';
import { AppDataSource } from '../seeder/seeder';

export function roleFactory() {
  const headMaster = new Role();
  headMaster.id = Roles.HEAD_MASTER;
  headMaster.name = 'Head Master';
  AppDataSource.manager.insert(Role, headMaster);

  const hR = new Role();
  hR.id = Roles.HR;
  hR.name = 'HR';
  AppDataSource.manager.insert(Role, hR);

  const mentor = new Role();
  mentor.id = Roles.MENTOR;
  mentor.name = 'Mentor';
  AppDataSource.manager.insert(Role, mentor);

  const student = new Role();
  student.id = Roles.STUDENT;
  student.name = 'Student';
  AppDataSource.manager.insert(Role, student);
}
