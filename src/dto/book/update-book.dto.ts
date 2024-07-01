import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsArray, IsInt } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  publicationDate?: Date;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  author?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  genres?: number[];
}
