import { Role } from '../../users/role/role.enum';
import { Role as RoleEntity } from '../../users/entities/role.entity';
import { AppDataSource } from '../seeder/seeder';

export function roleFactory() {
  const headMaster = new RoleEntity();
  headMaster.id = Role.HEAD_MASTER;
  headMaster.name = 'Head Master';
  AppDataSource.manager.insert(RoleEntity, headMaster);

  const hR = new RoleEntity();
  hR.id = Role.HR;
  hR.name = 'HR';
  AppDataSource.manager.insert(RoleEntity, hR);

  const mentor = new RoleEntity();
  mentor.id = Role.MENTOR;
  mentor.name = 'Mentor';
  AppDataSource.manager.insert(RoleEntity, mentor);

  const student = new RoleEntity();
  student.id = Role.STUDENT;
  student.name = 'Student';
  AppDataSource.manager.insert(RoleEntity, student);
}
