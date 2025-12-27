import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { In, Repository } from 'typeorm';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Genre } from 'src/genre/entities/genre.entity';
import { AssignGenreDto } from './dto/assign-genre.dto';

@Injectable()
export class SerieService {

    constructor(
        @InjectRepository(Serie) private readonly serieRepository: Repository<Serie>,
        @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>
    ) { }

    async findAllSeries() {
        return await this.serieRepository
            .createQueryBuilder("serie")
            .leftJoin("serie.genres", "genre")
            .where("serie.isActive = :isActive", { isActive: true })
            .select([
                'serie.id',
                'serie.title',
                'serie.synopsis',
                'serie.urlPortrait',
                'serie.isActive',
                'genre.id',
                'genre.type'
            ])
            .getMany();
    }

    async findSerieById(id: string) {
        const serie = this.serieRepository.findOne({
            where: { id, isActive: true },
            relations: ["episodes", "genres"]
        });

        return serie;
    }

    async createSerie(createSerieDto: CreateSerieDto) {
        let genreList: Genre[] = []

        if (createSerieDto.genresId && createSerieDto.genresId.length > 0) {
            genreList = await this.genreRepository.findBy({
                id: In(createSerieDto.genresId)
            });
        }

        const serie = this.serieRepository.create({
            ...createSerieDto,
            genres: genreList
        });

        return await this.serieRepository.save(serie);
    }

    async updateSerieById(id: string, updateSerieDto: UpdateSerieDto) {
        const serie = await this.serieRepository.findOneBy({ id, isActive: true });
        if (!serie)
            throw new BadRequestException("Serie no encontrada");

        let genreAssign: Genre[] | undefined;
        if (updateSerieDto.genresId !== undefined) {
            if (updateSerieDto.genresId.length > 0) {
                const genreList: Genre[] = await this.genreRepository.findBy({
                    id: In(updateSerieDto.genresId)
                });

                if (genreList.length !== updateSerieDto.genresId.length)
                    throw new BadRequestException("Uno o más géneros no se encontraron o no existen");

                genreAssign = genreList;
            } else {
                genreAssign = [];
            }
        }

        const updated = await this.serieRepository.update(id, updateSerieDto);

        return await this.serieRepository.save({
            ...updated,
            ...updateSerieDto,
            ...(genreAssign !== undefined ? { genres: genreAssign } : {})
        });
    }

    async deleteSerieById(id: string) {
        const serie = await this.serieRepository.findOne({
            where: { id, isActive: true }
        });
        if (!serie)
            throw new NotFoundException('Serie no encontrada o ya inactiva');

        serie.isActive = false;
        await this.serieRepository.save(serie);
    }

    async reactivateSerieById(id: string) {
        const serie = await this.serieRepository.findOne({
            where: { id, isActive: false },
        });
        if (!serie)
            throw new NotFoundException('Serie no encontrada o ya activa');

        serie.isActive = true;
        await this.serieRepository.save(serie);
    }

    async assignGenre(id: string, assignGenreDto: AssignGenreDto) {
        const serie = await this.serieRepository.findOne({
            where: { id, isActive: true },
            relations: ['genres']
        });
        if (!serie)
            throw new NotFoundException('Serie no encontrada o inactiva');

        const genres = await this.genreRepository.find({
            where: assignGenreDto.genres.map(type => ({
                type,
                isActive: true,
            })),
        });

        if (genres.length === 0)
            throw new NotFoundException('No se encontraron géneros válidos');

        const existingGenreIds = serie.genres.map(g => g.id);
        const newGenres = genres.filter(g => !existingGenreIds.includes(g.id));

        serie.genres.push(...newGenres);

        return await this.serieRepository.save(serie);
    };
}
