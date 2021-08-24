import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import { CaseEntity } from 'src/modules/case/entities/case.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  public email: string;

  @Column({
    length: 50,
  })
  public firstName: string;

  @Column({
    length: 50,
  })
  public lastName: string;

  @Column({
    length: 250,
    select: false,
    name: 'password',
  })
  public password_hash: string;

  @Column({
    length: 250,
  })
  public clientId: string;

  set password(password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    this.password_hash = passHash;
  }

  @OneToMany((type) => CaseEntity, (c) => c.user)
  cases: CaseEntity[];
}
