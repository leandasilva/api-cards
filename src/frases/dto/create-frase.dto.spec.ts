import { CreateFraseDto } from './create-frase.dto';

describe('CreateFraseDto', () => {
  it('debería crear una instancia con el texto correcto', () => {
    const dto = new CreateFraseDto();
    (dto as any).texto = 'Hola mundo';

    expect(dto).toBeInstanceOf(CreateFraseDto);
    expect((dto as any).texto).toBe('Hola mundo');
  });
});

