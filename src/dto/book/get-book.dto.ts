import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional, IsPositive, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';

export class GetBookDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDate()
  publicationDate: Date;

  @ApiProperty()
  @IsInt()
  author: Author;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  genres: Genre[];
}
