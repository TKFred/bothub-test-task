import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Book } from '@entities/book.entity';
import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';
import { GetBookDto } from '@dto/book/get-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<GetBookDto> {
        const { title, publicationDate, author, genres } = createBookDto;
    
        const authorId = await this.authorsRepository.findOne({ where: { id: author } });

        if (!authorId) {
            throw new NotFoundException(`Author with ID ${author} not found`);
        }

        const genreIds = await this.genresRepository.find({
            where: { id: In(genres) }
        });

        if (genreIds.length !== genres.length) {
            throw new NotFoundException(`Some of genre IDs ${genres} not found`);
        }
    
        const newBook = this.booksRepository.create({
          title,
          publicationDate,
          author: authorId,
          genres: genreIds,
        });
    
        return this.booksRepository.save(newBook);
      }

    findAll(): Promise<GetBookDto[]> {
        return this.booksRepository.find({ relations: ['author', 'genres'] });
    }

    findOne(id: number): Promise<GetBookDto> {
        return this.booksRepository.findOne({ 
            where: { id },
            relations: ['author', 'genres'] 
        });
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<GetBookDto> {
        const { title, publicationDate, author, genres } = updateBookDto;

        const book = await this.booksRepository.findOne({ where: { id } });

        if (title) {
            book.title = title;
        }

        if (publicationDate) {
            book.publicationDate = publicationDate;
        }
    
        const authorId = await this.authorsRepository.findOne({ where: { id: author } });

        if (!authorId) {
            throw new NotFoundException(`Author with ID ${author} not found`);
        }

        const genreIds = await this.genresRepository.find({
            where: { id: In(genres) }
        });

        if (genreIds.length !== genres.length) {
            throw new NotFoundException(`Some of genre IDs ${genres} not found`);
        }

        book.author = authorId;
        book.genres = genreIds;

        await this.booksRepository.save(book);

        return this.booksRepository.findOne({
            where: { id },
            relations: ['author', 'genres']
        });
    }

    async remove(id: number): Promise<void> {
        await this.booksRepository.delete(id);
    }
}
