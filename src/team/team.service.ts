import { Injectable, NotFoundException } from "@nestjs/common";
import { Team } from './team.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { profileEnd } from "console";
import { PlayersController } from "src/players/players.controller";
import { AHPModule } from "src/AHPModule";
import { PlayersService } from "src/players/players.service";

@Injectable()
export class TeamService {
    private team: Team[] = [];
    
    constructor(
        @InjectModel('Team') private readonly playerModel: Model<Team>, 
        private readonly playersService: PlayersService) {};

    async calculateAHP(criteria : []) {
    const ahp = new AHPModule(this.playersService);
    const team = ahp.calcularAHP(criteria);
    return team;
    }
}