import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetails } from './user.details.entity';
import { RoleEntity } from '../role/role.entity';
import { BookEntity } from '../book/book.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  userid: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne(type => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @ManyToMany(
    type => RoleEntity,
    role => role.user,
    { eager: true },
  )
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @ManyToMany(
    type => BookEntity,
    book => book.authors,
  )
  @JoinTable({ name: 'user_book' })
  books: BookEntity[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'ceated_name' })
  creatrAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_name' })
  updateAt: Date;
}
