import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsInt, Min, Max, IsString } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passHash: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(15)
    roles: number;
}