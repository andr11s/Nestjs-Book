import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  bookid: number;

  @Column({ type: 'varchar', unique: true, length: 35, nullable: false })
  bookname: string;

  @Column({ type: 'varchar', length: 100 })
  descriptions: string;

  @ManyToMany(
    type => UserEntity,
    user => user.books,
    { eager: true },
  )
  @JoinColumn()
  authors: UserEntity[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create-book' })
  createbook: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update-book' })
  updatebook: Date;
}
