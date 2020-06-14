import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController{
    constructor(private readonly playersService: PlayersService) {}
    
    @Post()
    addPlayer(
        @Body('name') name: string,
        @Body('position') position: string,
        @Body('oskills') oskills: number,
        @Body('dskills') dskills: number,
        @Body('pskills') pskills: number,
        @Body('sskills') sskills: number,
        @Body('bskills') bskills: number,
        @Body('rskills') rskills: number
    ) {
       const id = this.playersService.insertPlayer(name, position, oskills,dskills, pskills, sskills, bskills, rskills);
        return {id: id};
    
    }
    @Get()
    getAllPlayers() {
        return this.playersService.fetchPlayers();
    }
    @Get(':id')
    getPlayer(@Param('id') playerid: string) {
        return this.playersService.getSinglePlayer(playerid);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') playerid: string,  
        @Body('name') name: string,
        @Body('position') position: string,
        @Body('oskills') oskills: number,
        @Body('dskills') dskills: number,
        @Body('pskills') pskills: number,
        @Body('sskills') sskills: number,
        @Body('bskills') bskills: number,
        @Body('rskills') rskills: number
        ) {


        }
}