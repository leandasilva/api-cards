// src/frases/frases.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { FrasesService } from './frase.service';
import { Frase } from './schema/frase.schema';

@Controller('api')
export class FrasesController {
  constructor(private readonly frasesService: FrasesService) {}


  @Get('probando')
  async probando() {
    return this.frasesService.probando();
  }

   @Post('agregarFrase') // 👈 ahora POST /api/agregarFrase
  async agregarFrase(@Body('texto') texto: string) {
    if (!texto) {
      return { message: 'Debes enviar un texto!!' };
    }
    return this.frasesService.agregarFrase(texto);
  }

@Get('listarfrasesTodas')
  async listarFrases() {
    return this.frasesService.findAll();
  }

  @Get('buscar')
  async buscarFrases(@Query('q') q: string): Promise<Frase[]> {
    if (!q) throw new Error('Debe enviar una palabra clave para buscar');
    return this.frasesService.buscarFrasesPorPalabraClave(q);
  }

 @Delete('eliminarfrase/:id')
  async eliminarFrase(@Param('id') id: string) {
    const fraseEliminada = await this.frasesService.eliminarFrase(id);
    if (!fraseEliminada) {
      // Si el servicio devuelve null, significa que el ID no fue encontrado.
      // Lanzamos una excepción 404 para indicar esto.
      throw new NotFoundException(`La frase con ID "${id}" no fue encontrada.`);
    }
    // Si la frase fue eliminada, retornamos un mensaje de éxito.
    return { message: 'Frase eliminada correctamente' };
  }
}

