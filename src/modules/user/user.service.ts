import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreationAttributes } from './interfaces';
import { User } from './model/user.model';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByLogin(login: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ login: login });
  }

  async saveUser(dto: UserCreationAttributes): Promise<User | null> {
    return await this.userRepository.save(dto);
  }

  async activateUser(link: string): Promise<UserDto | null> {
    const user: User = await this.userRepository.save({
      link: link,
      isActive: true,
    });
    return new UserDto(user);
  }

  async getUserInfoById(id: string): Promise<UserDto | null> {
    const user: User = await this.userRepository.findOneBy({id:id});
    return new UserDto(user);
  }

  async findByLink(link: string): Promise <User | null> {
    return await this.userRepository.findOne({
      where: {
        activationLink: link,
        isActive: true,
      },
    });
  }
}
