import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { AssignGenreDto } from './dto/assign-genre.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('serie')
export class SerieController {
    constructor(private readonly serieService: SerieService) { }

    @Get()
    findAllSeries() {
        return this.serieService.findAllSeries();
    }

    @Get(':id')
    findSerieById(@Param('id') id: string) {
        return this.serieService.findSerieById(id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('crear-serie')
    createSerie(@Body() createSerieDto: CreateSerieDto) {
        return this.serieService.createSerie(createSerieDto);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Put('actualizar-serie/:id')
    updateSerieById(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
        return this.serieService.updateSerieById(id, updateSerieDto);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Delete('eliminar-serie/:id')
    deleteSerieById(@Param('id') id: string) {
        return this.serieService.deleteSerieById(id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Patch('reactivar-serie/:id')
    reactivateSerieById(@Param('id') id: string) {
        return this.serieService.reactivateSerieById(id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Patch('asignar-genero/:id')
    assignGenre(@Param('id') id: string, @Body() assignGenreDto: AssignGenreDto) {
        return this.serieService.assignGenre(id, assignGenreDto);
    }
}
