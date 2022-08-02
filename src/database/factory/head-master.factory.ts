import { Roles } from '../../users/role/role.enum';
import { AppDataSource } from '../seeder/seeder';
import { User } from '../../users/entities/user.entity';
import { Bcrypt } from '../../helpers/bcrypt';
import { UserDetail } from '../../users/entities/user-detail.entity';
import { BadRequestException } from '@nestjs/common';

export async function HeadMasterFactory() {
  const userDetail = new UserDetail();
  userDetail.name = 'Head Master';
  userDetail.email = 'headmaster123@gmail.com';
  userDetail.phone_number = '08142522627';
  userDetail.address = 'Jl.Melati no 23 Jakarta utara';

  const user = new User();
  user.username = 'headmaster123';
  user.password = await Bcrypt.hash('@HeadMaster123');
  user.role = Roles.HEAD_MASTER;
  user.userDetail = userDetail;

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.save(UserDetail, userDetail);
    await queryRunner.manager.save(User, user);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new BadRequestException(err.detail);
  } finally {
    await queryRunner.release();
  }
}
