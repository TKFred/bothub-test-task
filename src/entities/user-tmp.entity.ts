import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserTmp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passHash: string;

  @Column()
  registrationCode: number;
}