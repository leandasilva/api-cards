import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('debería estar definido', () => {
    expect(appController).toBeDefined();
  });

  it('getHello() debería devolver el mensaje de bienvenida', () => {
    const res = appController.getHello();
    expect(res).toEqual({ message: 'Bienvenido a la API de frases' });
  });
});
