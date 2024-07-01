import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class UpdateUserRoleDto {
    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(15)
    roles: number;
}