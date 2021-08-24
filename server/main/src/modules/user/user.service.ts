import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { CaseEntity } from '../case/entities/case.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository){}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  public async createUser(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.createUser(user);
  }

  public async getCasesForUser(email: string): Promise<CaseEntity[]> {
    return await this.userRepository.getUserCases(email);
  }

  public async authenticateUser(user: {
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const u: UserEntity = await this.userRepository.getUserByEmail(user.email);
    const passHash = crypto.createHmac('sha256', user.password).digest('hex');
    if (u.password_hash === passHash) {
      delete u.password_hash;
      return u;
    }
  }
}
