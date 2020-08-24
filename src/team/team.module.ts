import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from "./team.model";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { PlayersService } from "src/players/players.service";
import { PlayersModule } from "src/players/players.module";

@Module( {
    imports: [PlayersModule, MongooseModule.forFeature([{name: 'Team', schema: TeamSchema}])],
    controllers: [TeamController],
    providers: [TeamService]
})
export class TeamModule {}