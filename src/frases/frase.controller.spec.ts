import { Test, TestingModule } from '@nestjs/testing';
import { FrasesController } from '../frases/frase.controller';
import { FrasesService } from './frase.service';
import { NotFoundException } from '@nestjs/common';

describe('FrasesController', () => {
  let controller: FrasesController;
  let service: FrasesService;

  const mockFrasesService = {
    probando: jest.fn().mockResolvedValue('ok'),
    agregarFrase: jest.fn().mockImplementation((texto: string) => ({ _id: '1', texto })),
    findAll: jest.fn().mockResolvedValue([{ _id: '1', texto: 'Hola' }]),
    buscarFrasesPorPalabraClave: jest.fn().mockResolvedValue([{ _id: '1', texto: 'Hola mundo' }]),
    eliminarFrase: jest.fn().mockResolvedValue({ _id: '1', texto: 'chau' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrasesController],
      providers: [{ provide: FrasesService, useValue: mockFrasesService }],
    }).compile();

    controller = module.get<FrasesController>(FrasesController);
    service = module.get<FrasesService>(FrasesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('probando() debería llamar al servicio', async () => {
    await expect(controller.probando()).resolves.toBe('ok');
    expect(service.probando).toHaveBeenCalled();
  });

  it('agregarFrase() debería agregar con texto válido', async () => {
    const res = await controller.agregarFrase('hola');
    expect(res).toEqual({ _id: '1', texto: 'hola' });
    expect(service.agregarFrase).toHaveBeenCalledWith('hola');
  });

  it('agregarFrase() debería devolver mensaje si no hay texto', async () => {
    const res = await controller.agregarFrase('');
    expect(res).toEqual({ message: 'Debes enviar un texto!!' });
  });

  it('listarFrases() debería devolver todas', async () => {
    const res = await controller.listarFrases();
    expect(res).toEqual([{ _id: '1', texto: 'Hola' }]);
  });

  it('buscarFrases() debería llamar servicio con q', async () => {
    const res = await controller.buscarFrases('mundo');
    expect(res[0].texto).toContain('Hola');
    expect(service.buscarFrasesPorPalabraClave).toHaveBeenCalledWith('mundo');
  });

  it('eliminarFrase() debería retornar mensaje si elimina', async () => {
    const res = await controller.eliminarFrase('1');
    expect(res).toEqual({ message: 'Frase eliminada correctamente' });
  });

  it('eliminarFrase() debería lanzar NotFound si null', async () => {
    jest.spyOn(service, 'eliminarFrase').mockResolvedValueOnce(null);
    await expect(controller.eliminarFrase('99')).rejects.toThrow(NotFoundException);
  });
});
