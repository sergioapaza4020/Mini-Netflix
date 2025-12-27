import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>
  ) { }

  async findAll() {
    return await this.genreRepository
      .createQueryBuilder("genre")
      .leftJoin("genre.series", "serie")
      .where("genre.isActive = :isActive", { isActive: true })
      .select([
        'genre.id',
        'genre.type',
        'genre.description',
        'genre.isActive',
        'serie.id',
        'serie.title'
      ])
      .getMany();
  }

  async findOne(id: string) {
    const genre = await this.genreRepository.findOne({
      where: { id, isActive: true },
      relations: ['series']
    });

    return genre;
  }

  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(genre);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOneBy({ id, isActive: true });
    if (!genre)
      throw new BadRequestException("Género no encontrado");

    const updated = await this.genreRepository.update(id, updateGenreDto);

    return updated;
  }

  async remove(id: string) {
    const genre = await this.genreRepository.findOneBy({ id, isActive: true });
    if (!genre)
      throw new BadRequestException("Género no encontrado o ya inactivo");

    genre.isActive = false;
    await this.genreRepository.save(genre);

    return { message: 'Género eliminado correctamente' };
  }

  async reactivate(id: string) {
    const genre = await this.genreRepository.findOneBy({ id, isActive: false });
    if (!genre)
      throw new BadRequestException("Género no encontrado o ya activo");

    genre.isActive = true;
    await this.genreRepository.save(genre);

    return { message: 'Género activado correctamente' };
  }
}
