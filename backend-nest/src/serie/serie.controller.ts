import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

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

    @Post('crear-serie')
    createSerie(@Body() createSerieDto: CreateSerieDto) {
        return this.serieService.createSerie(createSerieDto);
    }

    @Put('actualizar-serie/:id')
    updateSerieById(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
        return this.serieService.updateSerieById(id, updateSerieDto);
    }

    @Delete('eliminar-serie/:id')
    deleteSerieById(@Param('id') id: string) {
        return this.serieService.deleteSerieById(id);
    }
    
    @Patch('reactivar-serie/:id')
    reactivateSerieById(@Param('id') id: string) {
        return this.serieService.reactivateSerieById(id);
    }
}
