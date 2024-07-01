import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGenreDto } from '@dto/genre/update-genre.dto';
import { CreateGenreDto } from '@dto/genre/create-genre.dto';
import { GetGenreDto } from '@dto/genre/get-genre.dto';
import { Genre } from '@entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) { }

    async create(createGenreDto: CreateGenreDto): Promise<GetGenreDto> {
        const newGenre = this.genresRepository.create(createGenreDto);
        return this.genresRepository.save(newGenre);
    }

    async update(id: number, updateGenreDto: UpdateGenreDto): Promise<GetGenreDto> {
        await this.genresRepository.update(id, updateGenreDto);
        return this.genresRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<GetGenreDto[]> {
        return this.genresRepository.find();
    }

    async findOne(id: number): Promise<GetGenreDto> {
        return this.genresRepository.findOne({ where: { id } });
    }

    async remove(id: number) {
        await this.genresRepository.delete(id);
    }
}
