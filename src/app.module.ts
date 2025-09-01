import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrasesModule } from './frases/frase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://leandro-cluster0:Lkd36108227@cluster0.fpxng0x.mongodb.net/challenger?retryWrites=true&w=majority&appName=Cluster0'), // 👈 tu base
    FrasesModule,
  ],
})
export class AppModule {}





