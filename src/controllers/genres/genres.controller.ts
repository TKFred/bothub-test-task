import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GetGenreDto } from '@dto/genre/get-genre.dto';
import { CreateGenreDto } from '@dto/genre/create-genre.dto';
import { UpdateGenreDto } from '@dto/genre/update-genre.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('genres')
@UseGuards(JwtAuthGuard)
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  @Post()
  async createOne(@Body() createGenreDto: CreateGenreDto): Promise<GetGenreDto> {
    return await this.genresService.create(createGenreDto);
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateGenreDto: UpdateGenreDto): Promise<GetGenreDto> {
    return await this.genresService.update(id, updateGenreDto);
  }

  @Get()
  async getAll(): Promise<GetGenreDto[]> {
    return await this.genresService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetGenreDto> {
    return await this.genresService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.genresService.remove(id);
  }
}
