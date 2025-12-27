import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerieModule } from './serie/serie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EpisodeModule } from './episode/episode.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
              rejectUnauthorized: false
            }
            : null,
      }
    }),
    SerieModule,
    EpisodeModule,
    GenreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
