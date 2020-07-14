import { Injectable } from '@angular/core';
import {Betslip} from '../Models/betslip';
import { from } from 'rxjs';
import { BounusTable } from '../Models/BounusTable';
import { BonusTableService } from '../Services/bonus-table.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  item=[];
  total=0;
  _idCounter=1;
  _value:Betslip;
  _multipleOdds=0;
  _finalMultiple:number=0;
  _bonusTable: BounusTable[] = [];
  _bonusPercent: number ;
  _numberOflegs: number = 0;
  _multipleStake:any=0;
  _multiplePayout=0

  private soccerJson = "assets/Soccer.json";
  constructor(private _http: HttpClient, private bonusTableService: BonusTableService) { }

  AddToBetSlip(event: any, punterChoice: string, odds: number, sportName: string, tournament: string, betType: string){
    console.log('In the method');
    this._value={
      id: this._idCounter,
      betType: betType,
      eventType: sportName,
      event: event,
      selectionOdds: odds,
      punterBetChoice: punterChoice,
      stake: 1,
      message: " ",
      warning: false,
      payout: 0,
      tournamentName: tournament,
     
      
    };
    this.item.push(this._value);
    this._idCounter++;
    this.total += this._value.stake;
    this.updateBetSlipID();
  }


  updateBetSlipID(){
    for(let index=0;index<this.item.length;index++){
        const element=this.item[index];
        element.id=index+1;
    }
  }

  checkifBetExist(bet:any,punterchoice:string):Boolean{
    var _flag=false;
    for(let index=0; index<this.item.length;index++){
      const element= this.item[index];
      if(element.event.id==bet.id && element.punterBetSelection==punterchoice){
        _flag=true;
        break;
      }
    }
    return _flag;
  }

  clearBetSlip(){
    // this.total=0;
    // this.item.splice(0,this.item.length);
    this.total = 0;
    this.item.splice(0, this.item.length);
    this._idCounter = 1;
    this._multipleOdds=0;
  }

  removeEvent(event:any){
      // this.item.splice(this.item.lastIndexOf(event),1)
      
      var total = 0;
      this.total - (event.selectiondOdds * event.stake);
      this.item.splice(this.item.lastIndexOf(event), 1);
      this._idCounter = this._idCounter - 1;
      this._multipleOdds-(event.selectiondOdds );
  }

  checkRelatedBet(bet: any) {
    this.calculateMultipleOdds(bet.selectionOdds);
    if (this.item.length > 0) {
      this.item.forEach(function (betItem) {
        if (betItem.event.EventId === bet.event.EventId) {
          bet.message = `Leg Related To Bet  ${betItem.id}`;
          betItem.message = `Leg Related To Bet  ${bet.id}`;
        }
      });
      this.calculateBetSlipTotalPayout(bet.selectionOdds);
      this.item.push(bet);
    }
    else {
      this.item.push(bet);
      console.log('bet item without modification');
    }
  }
  calculateBetSlipTotalPayout(odds: number) {
    for (let i = 0; i < this.item.length; i++) {
      // this.finalTotal +=  this.item[i].stake;
      console.log('Total went up', this.total);
    }
  }
  calculateMultipleOdds(odds: number) {
    this._multipleOdds+=odds;
    console.log('Odds passed',odds);
    console.log('odss added to', this._multipleOdds);
    this._finalMultiple = (this._bonusPercent/100);
    console.log('MultipleOdds',this._finalMultiple);
  }

  getBonusPercent(numberOflegs: number) {
  
    for(let index=0;index<this._bonusTable.length;index++){
      if(this._bonusTable[index].legs==numberOflegs){
        this._bonusPercent=this._bonusTable[index].bonuspercent;
        console.log('Bonus percent is',this._bonusPercent)
      }
    }
  }

  calculateBetPayout(stake: number, odds, id: number) {
    this.item[id - 1].stake = stake;
    this.item[id - 1].payout = Number(stake * odds).toFixed(2);
    // this.finalTotal=stake;
  }

  calculateCostBasedOnPayout(payout: number, odds: number, id: number) {
    this.item[id - 1].payout = payout;
    this.item[id - 1].stake = Number(payout / odds).toFixed(2);
    // this.finalTotal+=Number.parseInt(this.item[id-1].stake);
  }
  calculateMultipleBetPayout(stake: number, odds){
    this._multipleStake=stake;
    this._multiplePayout=Number((stake*odds).toFixed(2));
  }
  calculateMUltipleCostBasedOnPayout(payout: number, odds: number){
   this._multiplePayout=payout;
   this._multipleStake=Number(payout/odds).toFixed(2);
  }
  getBonusTableForSerice() {
    this.bonusTableService.getBonusTable().subscribe((data: any) => { this._bonusTable = data 
    console.log('bnt',this._bonusTable);
    });
  }

}
