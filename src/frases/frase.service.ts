import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Frase, FraseDocument } from './schema/frase.schema';

@Injectable()
export class FrasesService {
  constructor(@InjectModel(Frase.name) private fraseModel: Model<FraseDocument>) {}

  async probando() {
    return { message: 'Hola desde el CONTROLADOR DE Frases' };
  }

  async findAll(): Promise<Frase[]> {
    return this.fraseModel.find().exec();
  }

  async agregarFrase(texto: string): Promise<Frase> {
    const nuevaFrase = new this.fraseModel({ texto });
    return nuevaFrase.save();
  }

  async listarFrases(): Promise<Frase[]> {
    return this.fraseModel.find({}, 'texto').exec();
  }

  async buscarFrasesPorPalabraClave(q: string): Promise<Frase[]> {
    return this.fraseModel.find({ texto: { $regex: q, $options: 'i' } }, 'texto').exec();
  }

  async eliminarFrase(id: string): Promise<Frase | null> {
    return this.fraseModel.findByIdAndDelete(id).exec();
}
}
