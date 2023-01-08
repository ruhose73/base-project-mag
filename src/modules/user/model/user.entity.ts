import { Token } from 'src/modules/auth/model/token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { USER_TABLE_NAME } from '../constants';

@Entity(USER_TABLE_NAME)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @OneToOne(() => Token, (token) => token.id)
  userId: Token;
}
