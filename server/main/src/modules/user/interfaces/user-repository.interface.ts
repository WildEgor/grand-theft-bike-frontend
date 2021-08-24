import { CaseEntity } from 'src/modules/case/entities/case.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  createUser(user: CreateUserDto): Promise<UserEntity>;
  getUserCases(email: string): Promise<CaseEntity[]>;
}
