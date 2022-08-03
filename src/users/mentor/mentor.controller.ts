import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from '../role/role.enum';
import { UsersService } from '../users.service';

@Controller('mentor')
export class MentorController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto, Roles.MENTOR);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.userService.findAll(query, Roles.MENTOR);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto, Roles.MENTOR);
  }
}
