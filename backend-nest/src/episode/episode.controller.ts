import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) { }

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('crear-episodio')
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Put('actualizar-episodio/:id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete('eliminar-episodio/:id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch('reactivar-episodio/:id')
  reactivate(@Param('id') id: string) {
    return this.episodeService.reactivate(id);
  }
}
