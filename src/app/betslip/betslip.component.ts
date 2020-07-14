import { Component, OnInit } from '@angular/core';
import{BetslipService} from '../Services/betslip.service';
import {Betslip} from '../Models/betslip';

import { from } from 'rxjs';
import { BounusTable } from '../Models/BounusTable';
import { BonusTableService } from '../Services/bonus-table.service';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  constructor(private _betSlipService:BetslipService,private bonuTableService:BonusTableService) { }
  iterm=[];
  message='';
  count=0;
  betSlipFinal:number=0;
  bonusTable:BounusTable[]=[];
  multipleOdds=0;
  multipleStake=0;
  multiPayout=0;
  bonus=0;
  finalOdds=0;
  ngOnInit(): void {
  this.iterm=this._betSlipService.item;
  this.getBonusTabele();
    
  }

  removeFromBetSlip(event: any) {
    return this._betSlipService.removeEvent(event);
  }



  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.iterm=this._betSlipService.item;
    this.count=this.iterm.length;
    this.count = this._betSlipService.item.length;
    this.betSlipFinal=this._betSlipService.total;
    this.multipleOdds=this._betSlipService._multipleOdds;
    this.finalOdds=this._betSlipService._finalMultiple;
    this.bonus=this._betSlipService._bonusPercent;
    this.multipleStake=this._betSlipService._multipleStake;
    this.multiPayout=this._betSlipService._multiplePayout;
    
  }

  clearBetslip(){
    return this._betSlipService.clearBetSlip()
  }
  Bets:Betslip[];
  onKeyStake(stake:number,odds:number,id:number){
    this._betSlipService.calculateBetPayout(stake,odds,id);
 }
 onKeyPayout(stake:number,odds:number,id:number){
   this._betSlipService.calculateCostBasedOnPayout(stake,odds,id);
 }
 onKeyMultipleStake(stake:number){
    this._betSlipService.calculateMultipleBetPayout(stake,this.finalOdds);
 }
 onKeyMultiplePayout(payout:number){
   this._betSlipService.calculateMUltipleCostBasedOnPayout(payout,this.finalOdds);
 }

 getBonusTabele(){
    this.bonuTableService.getBonusTable().subscribe((data:any)=>{
      this.bonusTable=data;
      console.log('Bonus table'+data);
    })
 }


}
