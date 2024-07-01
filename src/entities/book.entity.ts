import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationDate: Date;

  @ManyToOne(() => Author)
  author: Author;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];
}
