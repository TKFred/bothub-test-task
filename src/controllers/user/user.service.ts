import { Injectable } from '@nestjs/common';
import { User } from '@entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserRoleDto } from '@dto/user/update-user-role.dto';
import { GetUserDto } from '@dto/user/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<GetUserDto> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<GetUserDto> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: UpdateUserRoleDto): Promise<GetUserDto> {
    await this.userRepository.update(id, { roles: user.roles });
    return await this.userRepository.findOne({ where: { id } });
  }
}