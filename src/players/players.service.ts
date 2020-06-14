import { Injectable, NotFoundException } from "@nestjs/common";
import { Player } from './players.model';

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    insertPlayer(name: string,position: string, oskills: number, dskills: number, pskills:number, sskills:number, bskills:number, rskills:number) {
        const playerId = Math.random().toString();
        const newPlayer = new Player(playerId, name,position, oskills, dskills, pskills, sskills, bskills, rskills);
        this.players.push(newPlayer);
        return playerId;
    }

    fetchPlayers() {
        return [...this.players];
    }

    getSinglePlayer(playerid: string) {
        const player = this.players.find((player) => player.id == playerid);
        if (!player) {
            throw new NotFoundException();
        }
        return {...player};
    }
}