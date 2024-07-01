import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { GetAuthorDto } from '@dto/author/get-author.dto';
import { CreateAuthorDto } from '@dto/author/create-author.dto';
import { UpdateAuthorDto } from '@dto/author/update-author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  async createOne(@Body() createAuthorDto: CreateAuthorDto): Promise<GetAuthorDto> {
    return await this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<GetAuthorDto> {
    return await this.authorsService.update(id, updateAuthorDto);
  }

  @Get()
  async getAll(): Promise<GetAuthorDto[]> {
    return await this.authorsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetAuthorDto> {
    return await this.authorsService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.authorsService.remove(id);
  }
}
