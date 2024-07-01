import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional, IsPositive, IsEmail, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserDto {
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
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  passHash: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(15)
  roles: number;
}
