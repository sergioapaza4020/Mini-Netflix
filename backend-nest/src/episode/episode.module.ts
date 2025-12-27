import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { SerieModule } from 'src/serie/serie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]),
    SerieModule
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
