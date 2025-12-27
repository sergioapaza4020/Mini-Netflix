import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { Repository } from 'typeorm';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SerieService {

    constructor(
        @InjectRepository(Serie) private readonly serieRepository: Repository<Serie>
    ) { }

    async findSerieById(id: string) {
        const serie = this.serieRepository.findOne({
            where: { id },
            relations: ["episodes"]
        });
        return serie;
    }

    async findAllSeries() {
        return await this.serieRepository.find();
    }

    async createSerie(createSerieDto: CreateSerieDto) {
        return await this.serieRepository.save(createSerieDto);
    }

    async updateSerieById(id: string, updateSerieDto: UpdateSerieDto) {
        return await this.serieRepository.update(id, updateSerieDto);
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
            where: { id, isActive: false }
        });

        if (!serie)
            throw new NotFoundException('Serie no encontrada o ya activa');

        serie.isActive = true;
        await this.serieRepository.save(serie);
    }
}
