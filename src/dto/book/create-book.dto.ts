import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsArray, IsInt } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  publicationDate: Date;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  author: number;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  genres: number[];
}
