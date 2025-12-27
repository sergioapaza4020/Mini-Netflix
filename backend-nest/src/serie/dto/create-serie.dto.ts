import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsString } from "class-validator";

export class CreateSerieDto {
    @ApiProperty({ example: 'Frieren', description: 'Título de la serie' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'está bonito', description: 'Sinopsis breve de lo que trata la serie' })
    @IsString()
    synopsis: string;

    @ApiProperty({ example: 'https://www.images.com/image.png', description: 'Enlace de la portada de la serie' })
    @IsString()
    urlPortrait: string;

    @ApiProperty({ example: '[1, 2, 3]', description: 'Ids de los episodios', type: [String], isArray: true })
    @Optional()
    @IsArray()
    episodesId: string[];

    @ApiProperty({ example: `["horror", "terror"]`, description: 'Ids de los géneros', type: [String], isArray: true })
    @Optional()
    @IsArray()
    genresId: string[];
}