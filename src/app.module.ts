import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrasesModule } from './frases/frase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/challenger'), // 👈 tu base
    FrasesModule,
  ],
})
export class AppModule {}





