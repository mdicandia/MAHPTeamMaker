import { Controller, Post, Body, Get, Param, Patch, Delete, Req, Res, Query } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController{
    constructor(private readonly teamService: TeamService) {}

    @Get()
    async getTeam(
    @Query('criterio') criterio: any) {
        let team = await this.teamService.calculateAHP(criterio);
        console.log(team);
        return team;
    }

}