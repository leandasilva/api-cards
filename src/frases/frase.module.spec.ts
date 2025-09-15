import { Test, TestingModule } from '@nestjs/testing';
import { FrasesModule } from '../frases/frase.module';
import { FrasesService } from './frase.service';
import { FrasesController } from './frase.controller';
import { getModelToken } from '@nestjs/mongoose';

describe('FrasesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [FrasesController],
      providers: [
        FrasesService,
        { provide: getModelToken('Frase'), useValue: {} }, // mock del modelo
      ],
    }).compile();
  });

  it('debería estar definido', () => {
    expect(module).toBeDefined();
  });

  it('debería exponer FrasesService', () => {
    const service = module.get<FrasesService>(FrasesService);
    expect(service).toBeDefined();
  });

  it('debería exponer FrasesController', () => {
    const controller = module.get<FrasesController>(FrasesController);
    expect(controller).toBeDefined();
  });
});
