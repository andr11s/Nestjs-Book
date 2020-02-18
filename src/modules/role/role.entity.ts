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
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  rolesid: number;

  @Column({ type: 'varchar', length: 25, nullable: false })
  RoleName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descriptions: string;

  @ManyToMany(
    type => UserEntity,
    UserEntity => UserEntity.roles,
  )
  @JoinColumn()
  user: UserEntity[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'ceated_name' })
  creatrAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_name' })
  updateAt: Date;
}
