import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [PlayersModule, MongooseModule.forRoot('mongodb+srv://boca95:O73UKlLvNJRNvlPp@cluster0-if284.mongodb.net/ahp?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
