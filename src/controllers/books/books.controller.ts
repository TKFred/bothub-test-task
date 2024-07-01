import { Controller, Get, Post, Body, Param, Delete, Put, UseFilters, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { GetBookDto } from '@dto/book/get-book.dto';
import { BookHttpExceptionFilter } from './book-http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
@UseGuards(JwtAuthGuard)
@UseFilters(BookHttpExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<GetBookDto> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(): Promise<GetBookDto[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<GetBookDto> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @UseFilters(BookHttpExceptionFilter)
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<GetBookDto> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}
