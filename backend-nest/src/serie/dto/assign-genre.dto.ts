import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class AssignGenreDto {
    @ApiProperty({ example: '[horror, fantasia]', description: 'Nombres de los géneros', isArray: true })
    @IsArray()
    genres: string[]
}