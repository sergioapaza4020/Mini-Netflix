import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) { }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('crear-genero')
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Put('actualizar-genero/:id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete('eliminar-genero/:id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch('reactivar-genero/:id')
  reactivate(@Param('id') id: string) {
    return this.genreService.reactivate(id);
  }
}
