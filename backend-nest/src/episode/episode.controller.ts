import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

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

  @Post('crear-episodio')
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }

  @Put('actualizar-episodio/:id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @Delete('eliminar-episodio/:id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id);
  }


  @Patch('reactivar-episodio/:id')
  reactivate(@Param('id') id: string) {
    return this.episodeService.reactivate(id);
  }
}
