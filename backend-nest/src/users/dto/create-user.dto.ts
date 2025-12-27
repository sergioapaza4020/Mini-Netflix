import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({ example: 'mushu', description: 'Nombre del usuario' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'mushu@admin.com', description: 'Correo electrónico del usuario' })
    @IsString()
    email: string;

    @ApiProperty({ example: 'password', description: 'Contraseña del usuario' })
    @IsString()
    password: string;
}