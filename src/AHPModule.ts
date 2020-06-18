import * as AHP from 'ahp'

export class AHPModule {
private ahpContext = new AHP();

    calcularAHP()
 {
    this.ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);
 
    this.ahpContext.addCriteria(['price', 'functionality', 'UX']);
 
//rank criteria with rank scale
        this.ahpContext.rankCriteriaItem('price', [
    ['VendorB', 'VendorC', 1 / 2],
    ['VendorA', 'VendorC', 1 / 2],
    ['VendorA', 'VendorB', 1]
]);
 
//rank criteria with rank scale
        this.ahpContext.rankCriteriaItem('functionality', [
    ['VendorB', 'VendorC', 1],
    ['VendorA', 'VendorC', 5],
    ['VendorA', 'VendorB', 5]
]);
 
//rank criteria with absolute rank scole
        this.ahpContext.setCriteriaItemRankByGivenScores('UX', [10, 10, 1]);
 
        this.ahpContext.rankCriteria(
    [
        ['price', 'functionality', 3],
        ['price', 'UX', 3],
        ['functionality', 'UX', 1]
    ]
);
 
let output = this.ahpContext.run();
console.log(output);}
}