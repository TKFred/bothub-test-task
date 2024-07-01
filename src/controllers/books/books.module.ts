import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from '@entities/book.entity';
import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Genre])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
