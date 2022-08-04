import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Roles } from '../../decorator/role.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../role/role.enum';
import { UsersService } from '../users.service';

@Controller('student')
export class StudentController {
  constructor(private userService: UsersService) {}

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, Role.STUDENT);
  }

  @Roles(Role.HR, Role.MENTOR, Role.HEAD_MASTER)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.userService.findAll(query, Role.STUDENT);
  }

  @Roles(Role.HR, Role.MENTOR, Role.HEAD_MASTER)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
