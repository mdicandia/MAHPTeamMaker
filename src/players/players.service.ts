import { Injectable, NotFoundException } from "@nestjs/common";
import { Player } from './players.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { profileEnd } from "console";

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>) {};

    async insertPlayer(name: string,position: string, oskills: number, dskills: number, pskills:number, sskills:number, bskills:number, rskills:number) {
        const newPlayer = new this.playerModel({ name: name, position: position, oskills: oskills, dskills: dskills, pskills: pskills, sskills: sskills, bskills: bskills, rskills: rskills });
        const result  = await newPlayer.save();
        console.log(result);
        return result.id as string;
    }

    async fetchPlayers() {
        const players = await this.playerModel.find().exec();
        return players.map((pl) => ({
            id: pl.id,
            name: pl.name,
            position: pl.position,
            oskills: pl.oskills,
            dskills: pl.dskills,
            pskills: pl.pskills,
            sskills: pl.sskills,
            bskills: pl.bskills,
            rskills: pl.rskills
         }));
    }

    async getSinglePlayer(playerid: string) {
        const player = await this.findPlayer(playerid);
        return {id: player.id, name: player.name, position: player.position, oskills: player.oskills, dskills: player.dskills, pskills: player.pskills, sskills: player.sskills, bskills: player.bskills, rskills: player.rskills};
    }

    async updatePlayer(playerId: string,name: string,position: string, oskills: number, dskills: number, pskills:number, sskills:number, bskills:number, rskills:number) {
        const player = await this.findPlayer(playerId);
        if (oskills) {
            player.oskills = oskills;
        }
        if (dskills) {
            player.dskills = dskills;
        }
        if (pskills) {
            player.pskills = pskills;
        }
        if (sskills) {
            player.sskills = sskills;
        }
        if (rskills) {
            player.rskills = rskills;
        }
        if (bskills) {
            player.bskills = bskills;
        }
        player.save();
    }

    private async findPlayer(id:string): Promise<Player>  {
        let player;
        try {
            player = await this.playerModel.findById(id);
        } catch(error) {
        throw new NotFoundException();
        }
        return player;
    }

    async deletePlayer(id:string) {
        const result =   await this.playerModel.deleteOne({_id: id}).exec();

    }
}