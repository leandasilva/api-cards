import { Test, TestingModule } from '@nestjs/testing';
import { FrasesService } from './frase.service';
import { getModelToken } from '@nestjs/mongoose';
import { Frase, FraseDocument } from './schema/frase.schema';
import { Model } from 'mongoose';

describe('FrasesService', () => {
  let service: FrasesService;
  let model: Model<FraseDocument> & { find: jest.Mock; findByIdAndDelete: jest.Mock };

  // Mock de la instancia que devuelve new this.fraseModel()
  const mockFraseInstance = {
    save: jest.fn().mockResolvedValue({ texto: 'Hola' }),
  };

  // Mock del modelo como constructor y con métodos
  const mockFraseModel = jest.fn().mockImplementation(() => mockFraseInstance) as unknown as
    Model<FraseDocument> & { find: jest.Mock; findByIdAndDelete: jest.Mock };

  mockFraseModel.find = jest.fn();
  mockFraseModel.findByIdAndDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrasesService,
        { provide: getModelToken(Frase.name), useValue: mockFraseModel },
      ],
    }).compile();

    service = module.get<FrasesService>(FrasesService);
    model = module.get(getModelToken(Frase.name));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('probando() debería devolver mensaje', async () => {
    const res = await service.probando();
    expect(res).toEqual({ message: 'Hola desde el CONTROLADOR DE Frases' });
  });

  it('findAll() debería llamar a find().exec()', async () => {
    const execMock = jest.fn().mockResolvedValue([{ texto: 'Hola' }]);
    model.find.mockReturnValue({ exec: execMock });

    const res = await service.findAll();
    expect(res).toEqual([{ texto: 'Hola' }]);
    expect(model.find).toHaveBeenCalled();
    expect(execMock).toHaveBeenCalled();
  });

  it('agregarFrase() debería crear y guardar una frase', async () => {
    const res = await service.agregarFrase('Hola');
    expect(res).toEqual({ texto: 'Hola' });
    expect(mockFraseModel).toHaveBeenCalledWith({ texto: 'Hola' });
    expect(mockFraseInstance.save).toHaveBeenCalled();
  });

  it('buscarFrasesPorPalabraClave() debería llamar a find con regex', async () => {
    const execMock = jest.fn().mockResolvedValue([{ texto: 'Hola mundo' }]);
    model.find.mockReturnValue({ exec: execMock });

    const res = await service.buscarFrasesPorPalabraClave('mundo');
    expect(res).toEqual([{ texto: 'Hola mundo' }]);
    expect(model.find).toHaveBeenCalledWith(
      { texto: { $regex: 'mundo', $options: 'i' } },
      'texto',
    );
    expect(execMock).toHaveBeenCalled();
  });

  it('eliminarFrase() debería llamar a findByIdAndDelete', async () => {
    const execMock = jest.fn().mockResolvedValue({ texto: 'chau' });
    model.findByIdAndDelete.mockReturnValue({ exec: execMock });

    const res = await service.eliminarFrase('1');
    expect(res).toEqual({ texto: 'chau' });
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(execMock).toHaveBeenCalled();
  });
});
