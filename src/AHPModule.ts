import { PlayersService } from "./players/players.service";
import { PlayersController } from "./players/players.controller";

const AHP = require('ahp');

export class AHPModule {
    private ahpContext = new AHP();

    constructor(private readonly playersService: PlayersService) {}
    async calcularAHP(criteria: [])
 {
    let player = await this.playersService.fetchPlayers();
    let criteriosarmados = ['Ofensivo', 'Defensivo'];
    this.ahpContext.addCriteria(criteriosarmados);
    this.ahpContext.addItems(player.map(x => x.name));
    let playersValorAbsoluto = this.setValorAbsoluto(player);
    //rank criteria with rank scale
    this.ahpContext = this.crearRankItemMatrix(playersValorAbsoluto, criteriosarmados, this.ahpContext);
    this.ahpContext.rankCriteria(
    [
        ['Ofensivo', 'Defensivo', 8]
    ]);
    let output = this.ahpContext.run();
    console.log(output);
    // this.ahpContext.setCriteriaItemRankByGivenScores('Ofensivo', [10,10,1]);
    // this.ahpContext.setCriteriaItemRankByGivenScores('Defensivo', [1,1,10]);
    // console.log(this.ahpContext.export());
 }

 setValorAbsoluto(player)
 {
    player.map(obj => {
        obj.oskills * 2;
        obj.bskills * 2;
        obj.dskills * 2;
        obj.oskills * 2;
        obj.pskills * 2;
        obj.sskills * 2;
        obj.name;
        obj.position;
     })
    return player;
 }

 crearRankItemMatrix(players, criterios, contexto)
 {
     for (let criteria of criterios)
    {
        let valoresabsolutos = [];
        valoresabsolutos = this.getValuePlayerCriteria(players, criteria);
        contexto.setCriteriaItemRankByGivenScores(criteria, valoresabsolutos);
    }
    return contexto;
 }

 getValuePlayerCriteria(players, criterio)
 {
    let result = [];
    for (let player of players)
    {
        result.push(this.getValuePlayer(player, criterio));
    }
    return result;
 }
 
 getValuePlayer(player, criterio)
 {
     if (criterio == 'Ofensivo')
     {
         return (player.oskills + (player.sskills/1.5) + (player.pskills/3) + (player.rskills/4));
     }
     if (criterio == 'Defensivo')
     {
         return (player.dskills + (player.rskills/1.5) + (player.bskills/2));
     }
     if (criterio == 'Reboteador')
     {
        return (player.rrskills);
     }
     if (criterio == 'Pasador')
     {
         return (player.pskills);
     }
     if (criterio == 'Bloqueador')
     {
         return (player.bskills);
     }
 }
// //rank criteria with rank scale
//         this.ahpContext.rankCriteriaItem('functionality', [
//     ['VendorB', 'VendorC', 1],
//     ['VendorA', 'VendorC', 5],
//     ['VendorA', 'VendorB', 5]
// ]);
 
// //rank criteria with absolute rank scole
//         this.ahpContext.setCriteriaItemRankByGivenScores('UX', [10, 10, 1]);
 
//         this.ahpContext.rankCriteria(
//     [
//         ['price', 'functionality', 3],
//         ['price', 'UX', 3],
//         ['functionality', 'UX', 1]
//     ]

 
// let output = this.ahpContext.run();
// console.log(output);
}
