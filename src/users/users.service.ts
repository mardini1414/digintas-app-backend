import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../helpers/bcrypt';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetail } from './entities/user-detail.entity';
import { User } from './entities/user.entity';
import { Roles } from './role/role.enum';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto, roles: Roles) {
    const userDetail = new UserDetail();
    userDetail.name = createUserDto.name;
    userDetail.email = createUserDto.email;
    userDetail.phone_number = createUserDto.phone_number;
    userDetail.address = createUserDto.address;

    const user = new User();
    user.username = createUserDto.username;
    user.password = await Bcrypt.hash('@Dignitas123');
    user.role = roles;
    user.userDetail = userDetail;

    const queryRunner = this.dataSource.createQueryRunner();
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

    return {
      status: HttpStatus.CREATED,
      message: 'user has been created successfully',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
