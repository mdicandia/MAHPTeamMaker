import { Controller, Post, Body, Get, Param, Patch, Delete, Req, Res } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController{
    constructor(private readonly playersService: PlayersService) {}
   
    @Post()
    async addPlayer(
    @Body('name') name: string,
    @Body('position') position: string,
    @Body('oskills') oskills: number,
    @Body('dskills') dskills: number,
    @Body('pskills') pskills: number,
    @Body('sskills') sskills: number,
    @Body('bskills') bskills: number,
    @Body('rskills') rskills: number,
    @Body('stskills') stskills: number,
    @Body('ptskills') ptskills: number
    ) {    
    const id = await this.playersService.insertPlayer(name, position, pskills, sskills, bskills, rskills, ptskills, stskills);
    return {id: id};
    }

    @Get()
    async getAllPlayers() {
        const players = await this.playersService.fetchPlayers();
        return players;
    }
    @Get(':id')
    getPlayer(@Param('id') playerid: string) {
        return this.playersService.getSinglePlayer(playerid);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') playerid: string,  
        @Body('name') name: string,
        @Body('position') position: string,
        @Body('pskills') pskills: number,
        @Body('sskills') sskills: number,
        @Body('bskills') bskills: number,
        @Body('rskills') rskills: number
        ) {
            await this.playersService.updatePlayer(playerid, name, position, pskills, sskills, bskills, rskills);
        }

    @Delete(':id')
    removeProduct(@Param('id') playerId: string) {
        this.playersService.deletePlayer(playerId);
        return null;
    }
}