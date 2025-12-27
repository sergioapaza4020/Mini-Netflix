import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateEpisodeDto {
    @ApiProperty({ example: 'Prólogo', description: 'Nombre del episodio' })
    @IsString()
    title: string;

    @ApiProperty({ example: '1560', description: 'Duración del episodio, en segundos' })
    @IsNumber()
    durationSeconds: number;

    @ApiProperty({ example: '1', description: 'Número o numeración del episodio' })
    @IsString()
    episodeNumber: string;

    @ApiProperty({ example: 'Frieren', description: 'Nombre de la serie' })
    @IsString()
    serieTitle: string;
}
