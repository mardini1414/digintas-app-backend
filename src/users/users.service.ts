import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Bcrypt } from '../helpers/bcrypt';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetail } from './entities/user-detail.entity';
import { User } from './entities/user.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private userDetailRepository: Repository<UserDetail>,
  ) {}

  async create(createUserDto: CreateUserDto, roles: any) {
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

  findAll(query: PaginateQuery, role: any): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      relations: ['role', 'userDetail'],
      sortableColumns: ['created_at'],
      searchableColumns: ['userDetail.name'],
      defaultLimit: 5,
      select: [
        'id',
        'username',
        'role.id',
        'role.name',
        'userDetail.name',
        'userDetail.email',
        'userDetail.phone_number',
        'userDetail.address',
        'created_at',
      ],
      where: {
        role: role,
      },
    });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository
      .findOneOrFail({
        relations: {
          role: true,
          userDetail: true,
        },
        select: {
          id: true,
          username: true,
          password: true,
          role: { id: true, name: true },
          userDetail: {
            name: true,
          },
        },
        where: {
          username: username,
        },
      })
      .catch((e) => {
        throw new UnauthorizedException();
      });
  }

  async findOne(id: string) {
    return await this.userRepository
      .findOneOrFail({
        relations: {
          role: true,
          userDetail: true,
        },
        select: {
          id: true,
          username: true,
          role: { id: true, name: true },
          userDetail: {
            name: true,
            email: true,
            phone_number: true,
            address: true,
          },
          created_at: true,
          updated_at: true,
          deleted_at: true,
        },
        where: {
          id: id,
        },
      })
      .catch((e) => {
        throw new NotFoundException('user not found');
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository
      .findOne({
        relations: { userDetail: true },
        select: { id: true, userDetail: { id: true } },
        where: { id: id },
      })
      .catch((e) => {
        throw new NotFoundException('user not found');
      });

    await this.userRepository.update(id, {
      username: updateUserDto.username,
      password: await Bcrypt.hash(updateUserDto.password),
    });

    await this.userDetailRepository.update(user.userDetail.id, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      phone_number: updateUserDto.phone_number,
      address: updateUserDto.address,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'user has been updated successfully',
    };
  }

  async remove(id: string) {
    const remove = await this.userRepository.softDelete({ id: id });

    if (remove.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'user has been removed',
    };
  }
}
