import { Frase, FraseSchema } from './frase.schema';

describe('Frase Schema', () => {
  it('debería crear la clase Frase', () => {
    const frase = new Frase();
    (frase as any).texto = 'Hola mundo';
    expect(frase).toBeInstanceOf(Frase);
    expect((frase as any).texto).toBe('Hola mundo');
  });

  it('debería definir el schema correctamente', () => {
    const paths = Object.keys(FraseSchema.paths);
    expect(paths).toContain('texto');
    expect(FraseSchema.path('texto').isRequired).toBeTruthy();
  });
});
