import { User } from 'src/modules/user/model/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { TOKEN_TABLE_NAME } from '../constants';

@Entity(TOKEN_TABLE_NAME)
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
