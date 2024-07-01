import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity()
@Check(`"roles" >= 0 AND "roles" <= 15`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passHash: string;

  @Column()
  roles: number;
}