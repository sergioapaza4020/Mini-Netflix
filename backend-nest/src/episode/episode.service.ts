import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Repository } from 'typeorm';
import { Serie } from 'src/serie/entities/serie.entity';
import { EpisodeResponseDto } from './dto/response-episode.dto';

@Injectable()
export class EpisodeService {

  constructor(
    @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(Serie) private readonly serieRepository: Repository<Serie>
  ) { }

  async findAll() {
    return await this.episodeRepository
      .createQueryBuilder("episode")
      .leftJoin("episode.serie", "serie")
      .where("episode.isActive = :isActive", { isActive: true })
      .select([
        'episode.id',
        'episode.title',
        'episode.durationSeconds',
        'episode.episodeNumber',
        'episode.isActive',
        'serie.id',
        'serie.title'
      ])
      .getMany();
}

  async findOne(id: string): Promise < EpisodeResponseDto > {
  const episode = await this.episodeRepository.findOne({
    where: { id, isActive: true },
    relations: ['serie']
  })

    if(!episode)
      throw new NotFoundException('Episodio no encontrado');

  return {
    id: episode.id,
    title: episode.title,
    durationSeconds: episode.durationSeconds,
    episodeNumber: episode.episodeNumber,
    serieTitle: episode.serie.title
  };
}

  async create(createEpisodeDto: CreateEpisodeDto): Promise < EpisodeResponseDto > {
  const serie = await this.serieRepository.findOneBy({ title: createEpisodeDto.serieTitle });
  if(!serie)
      throw new BadRequestException(`Serie ${createEpisodeDto.serieTitle} no existente o no encontrada`);

  const episode = await this.episodeRepository.save({
    ...createEpisodeDto,
    serie
  });

  return {
    id: episode.id,
    title: episode.title,
    durationSeconds: episode.durationSeconds,
    episodeNumber: episode.episodeNumber,
    serieTitle: episode.serie.title
  };
}

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto): Promise < EpisodeResponseDto > {
  const episode = await this.episodeRepository.findOneBy({ id, isActive: true });
  if(!episode)
      throw new BadRequestException(`Episodio no existente o no encontrado`);

  let serieAssign = episode.serie;
  if(updateEpisodeDto.serieTitle !== undefined) {
  let serieTitle = updateEpisodeDto.serieTitle.toLowerCase();
  const serie = await this.serieRepository.findOneBy({
    title: serieTitle
  });

  if (!serie)
    throw new NotFoundException(`Serie ${serieTitle} no existente o no encontrada`);

  serieAssign = serie;
}

const updated = await this.episodeRepository.save({
  ...episode,
  ...updateEpisodeDto,
  serie: serieAssign
});

return {
  id: updated.id,
  title: updated.title,
  durationSeconds: updated.durationSeconds,
  episodeNumber: updated.episodeNumber,
  serieTitle: updated.serie.title
};
  }

  async remove(id: string) {
  const episode = await this.episodeRepository.findOne({
    where: { id, isActive: true }
  });
  if (!episode)
    throw new NotFoundException('Episodio no encontrado o ya inactivo');

  episode.isActive = false;
  await this.episodeRepository.save(episode);

  return { message: 'Episodio eliminado correctamente' };
}

  async reactivate(id: string) {
  const episode = await this.episodeRepository.findOne({
    where: { id, isActive: false }
  });
  if (!episode)
    throw new NotFoundException('Episodio no encontrado o ya activo');

  episode.isActive = true;
  await this.episodeRepository.save(episode);

  return { message: 'Episodio activado correctamente' };
}
}
