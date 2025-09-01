import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FraseDocument = Frase & Document;

@Schema()
export class Frase {
  @Prop({ required: true })
  texto: string;
}

export const FraseSchema = SchemaFactory.createForClass(Frase);


