import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {
    @ApiProperty({ example: 'mushu@admin.com', description: 'Correo electrónico del usuario' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password', description: 'Contraseña del usuario' })
    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password: string;

}