import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrasesService } from './frase.service';
import { FrasesController } from './frase.controller';
import { Frase, FraseSchema } from './schema/frase.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Frase.name, schema: FraseSchema }])],
  controllers: [FrasesController],
  providers: [FrasesService],
})
export class FrasesModule {}


