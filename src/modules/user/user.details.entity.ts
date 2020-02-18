import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user-details')
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  detailsid: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'ceated_name' })
  creatrAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_name' })
  updateAt: Date;
}
