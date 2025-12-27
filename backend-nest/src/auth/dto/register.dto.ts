import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @ApiProperty({ example: 'mushu', description: 'Nombre del usuario' })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({ example: 'mushu@admin.com', description: 'Correo electrónico del usuario' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password', description: 'Contraseña del usuario' })
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
}