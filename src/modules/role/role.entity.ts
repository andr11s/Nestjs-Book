import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  rolesid: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  RoleName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descriptions: string;

  @ManyToMany(
    type => UserEntity,
    UserEntity => UserEntity.roles,
  )
  @JoinColumn()
  user: UserEntity[];

  @CreateDateColumn({ type: 'timestamp', name: 'ceated_name' })
  creatrAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_name' })
  updateAt: Date;
}
