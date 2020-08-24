import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModule } from './team/team.module';

@Module({
  imports: [PlayersModule, TeamModule, MongooseModule.forRoot('mongodb+srv://boca95:O73UKlLvNJRNvlPp@cluster0-if284.mongodb.net/ahp?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
