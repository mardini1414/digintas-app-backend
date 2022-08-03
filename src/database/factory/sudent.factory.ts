import { Roles } from '../../users/role/role.enum';
import { AppDataSource } from '../seeder/seeder';
import { User } from '../../users/entities/user.entity';
import { Bcrypt } from '../../helpers/bcrypt';
import { UserDetail } from '../../users/entities/user-detail.entity';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export async function studentFactory(number: number) {
  const userDetail = new UserDetail();
  userDetail.name = faker.name.findName();
  userDetail.email = faker.internet.email(
    faker.name.firstName(),
    `${faker.name.lastName()}${number}`,
  );
  userDetail.phone_number = faker.phone.number('08############');
  userDetail.address = faker.address.streetAddress();

  const role: any = Roles.STUDENT;
  const user = new User();
  user.username = `student${number}`;
  user.password = await Bcrypt.hash('@Dignitas123');
  user.role = role;
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
