import { PlayersService } from "./players/players.service";

const AHP = require('ahp');
const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix;
    
const ahp = require('ahp-lite');

export class AHPModule {
    private ahpContext = new AHP();

    constructor(private readonly playersService: PlayersService) {}
    async calcularAHP(criteria: any)
 {
     let criterios = JSON.parse(criteria);
     let player = await this.playersService.fetchPlayers();
    let criteriosarmados = ['Pasador','Tirador','Posteador','Robador', 'Bloqueador', 'Reboteador'];
    this.ahpContext.addCriteria(criteriosarmados);
    this.ahpContext.addItems(player.map(x => x.name + '-' + x.position));
    let playersValorAbsoluto = this.setValorAbsoluto(player);
    this.ahpContext = this.crearRankItemMatrix(playersValorAbsoluto, criteriosarmados, this.ahpContext);
    this.ahpContext = this.crearRankCriteriaMatrix(criteriosarmados, criterios, this.ahpContext);
    let output = this.ahpContext.run();
    let ranking = output.rankedScoreMap;
    let keys = Object.keys(ranking);
    let jugadores = [];
    for (let key of keys) {
        jugadores.push([key.split('-')[0], key.split('-')[1], ranking[key]]); 
    }
    let team = this.separarPosiciones(jugadores);
    return team;
 }

 separarPosiciones(jugadores)
 {
     let posiciones = new Set();
    jugadores.forEach(function (value) {
        posiciones.add(value[1]);
    });
    return this.armarArregloPorPosicion(jugadores, posiciones);
 }

 armarArregloPorPosicion(jugadores, posiciones)
 {
     let resultado = [];
     posiciones.forEach(value => {
         let arrayparcial = jugadores.filter(element => element[1] == value);
         resultado.push(arrayparcial);
    });
    // console.log(resultado );
    resultado.forEach(value => value.sort(function (a, b){
        if (a[2] < b[2]) {
            return 1;
          }
          if (a[2] > b[2]) {
            return -1;
          }
    }));
    let equipoFinal = [];
    resultado.forEach(jugadores => {
        equipoFinal.push(jugadores[0]);
    });
    return equipoFinal;
    //  console.log(resultado );

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
 
 crearRankCriteriaMatrix(criterio, criteria, contexto)
 {
     let variables = [];
     let fijos = [
        [criterio[0], criterio[1], criteria.passingvsshooting],
     [criterio[2], criterio[1], criteria.postingvsshooting],
     [criterio[2], criterio[0], criteria.postingvspassing],
     [criterio[4], criterio[5], criteria.reboundingvsblocking],
     [criterio[3], criterio[5], criteria.stealingvsblocking],
    [criterio[3], criterio[4], criteria.stealingvsrebounding]];
     if (criteria.opcion == 'Ofensivo')
     {
        variables = [['Pasador', 'Reboteador', 3], ['Pasador', 'Bloqueador', 3], ['Pasador', 'Robador', 3],
    ['Tirador', 'Reboteador', 3], ['Tirador', 'Bloqueador', 3], ['Tirador', 'Robador', 3],
    ['Posteador', 'Reboteador', 3], ['Posteador', 'Bloqueador', 3], ['Posteador', 'Robador', 3]];
     }
     else {
        variables = [['Reboteador', 'Pasador', 3], ['Bloqueador', 'Pasador', 3], ['Robador', 'Pasador', 3],
        ['Reboteador', 'Tirador', 3], ['Bloqueador', 'Tirador', 3], ['Robador', 'Tirador', 3],
        ['Reboteador', 'Posteador', 3], ['Bloqueador', 'Posteador', 3], ['Robador', 'Posteador', 3]];
     }
     let resultado = fijos.concat(variables);
     contexto.rankCriteria(resultado);
     return contexto;
 }

 private crearRankItemMatrix(players, criterios, contexto)
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
         return (player.oskills);
     }
     if (criterio == 'Defensivo')
     {
         return (player.dskills);
     }
     if (criterio == 'Reboteador')
     {
        return (player.rskills);
     }
     if (criterio == 'Pasador')
     {
         return (player.pskills);
     }
     if (criterio == 'Bloqueador')
     {
         return (player.bskills);
     }
     if (criterio == 'Robador')
     {
         return (player.stskills);
     }
     if (criterio == 'Posteador')
     {
         return (player.ptskills);
     }
     if (criterio == 'Tirador')
     {
         return (player.sskills);
     }
 }
}
