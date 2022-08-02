import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Roles } from '../role/role.enum';
import { UsersService } from '../users.service';

@Controller('student')
export class StudentController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto, Roles.STUDENT);
  }
}
