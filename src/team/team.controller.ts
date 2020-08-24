import { Controller, Post, Body, Get, Param, Patch, Delete, Req, Res } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController{
    constructor(private readonly teamService: TeamService) {}

    @Get(':criterio')
    getTeam(@Param('criterio') criterio: []) {
        return this.teamService.calculateAHP(criterio);
    }

}