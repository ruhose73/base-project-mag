import { UserRole, UserStatus } from 'src/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { USER_TABLE_NAME } from '../constants';
import { Note } from 'src/modules/note/model/note.model';

@Entity(USER_TABLE_NAME)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'uuid', nullable: false })
  activationLink: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UnActive,
    nullable: false,
  })
  status: UserStatus;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  // RELATIONS
  @OneToMany(type => Note, note => note.user) notes: Note[];  
}
