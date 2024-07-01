import { Controller, Get, Body, Param, Put, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserRoleDto } from '@dto/user/update-user-role.dto';
import { GetUserDto } from '@dto/user/get-user.dto';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findOne(@Req() req: Request): Promise<GetUserDto> {
    return this.userService.findOneById(+req.user.id);
  }

  @Put(':id/role')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserRoleDto, @Req() req: Request): Promise<GetUserDto> {
    if (+id === +req.user.id) {
      throw new ForbiddenException('You can not edit your own rights')
    }
    return this.userService.update(id, updateUserDto);
  }
}
