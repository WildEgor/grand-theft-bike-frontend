import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AppErrorTypeEnum } from '../common/error/AppErrorTypeEnum';
import { AppError } from '../common/error/AppError';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CaseEntity } from 'src/modules/case/entities/case.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find();
    if (users.length > 0) {
      return Promise.resolve(users);
    } else {
      throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
    }
  }

  public async createUser(user: CreateUserDto): Promise<UserEntity> {
    let u: UserEntity = await UserEntity.findOne({ email: user.email });
    if (u) {
      throw new AppError(AppErrorTypeEnum.USER_EXISTS);
    } else {
      u = new UserEntity();
      Object.assign(u, user);
      return await UserEntity.save(u);
    }
  }

  public async getUserCases(email: string): Promise<CaseEntity[]> {
    const userData = await this.userRepository.findOne({
      where: { email },
      relations: ['cases'],
    });

    return userData.cases;
  }

  public async getUserByEmail(email: string) {
    const user: UserEntity = await this.userRepository.findOne({
      select: ['id', 'email', 'password_hash'],
      where: { email },
    });

    if (user) {
      return Promise.resolve(user);
    } else {
      throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
    }
  }
}
