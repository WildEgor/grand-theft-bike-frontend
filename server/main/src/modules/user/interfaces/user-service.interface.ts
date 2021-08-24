import { CaseEntity } from 'src/modules/case/entities/case.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findAll(): Promise<UserEntity[]>;
  createUser(user: CreateUserDto): Promise<UserEntity>;
  getCasesForUser(email: string): Promise<CaseEntity[]>;
}
