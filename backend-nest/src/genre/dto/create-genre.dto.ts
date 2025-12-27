import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenreDto {
    @ApiProperty({ example: 'Terror', description: 'Tipo de género' })
    @IsString()
    type: string;

    @ApiProperty({ example: 'Descripción del género', description: 'Descripción del género' })
    @IsString()
    description: string;
}
