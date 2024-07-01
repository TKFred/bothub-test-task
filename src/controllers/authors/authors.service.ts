import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAuthorDto } from '@dto/author/update-author.dto';
import { CreateAuthorDto } from '@dto/author/create-author.dto';
import { GetAuthorDto } from '@dto/author/get-author.dto';
import { Author } from '@entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) { }

    async create(createAuthorDto: CreateAuthorDto): Promise<GetAuthorDto> {
        const newAuthor = this.authorsRepository.create(createAuthorDto);
        return this.authorsRepository.save(newAuthor);
    }

    async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<GetAuthorDto> {
        await this.authorsRepository.update(id, updateAuthorDto);
        return this.authorsRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<GetAuthorDto[]> {
        return this.authorsRepository.find();
    }

    async findOne(id: number): Promise<GetAuthorDto> {
        return this.authorsRepository.findOne({ where: { id } });
    }

    async remove(id: number) {
        await this.authorsRepository.delete(id);
    }
}
