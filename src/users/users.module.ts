import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { StudentController } from './student/student.controller';
import { MentorController } from './mentor/mentor.controller';
import { HrController } from './hr/hr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserDetail } from './entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetail, Role])],
  controllers: [StudentController, MentorController, HrController],
  providers: [UsersService],
})
export class UsersModule {}
