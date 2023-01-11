import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreationAttributes } from './interfaces';
import { User } from './model/user.model';

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
}
