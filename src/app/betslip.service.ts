import { Injectable } from '@angular/core';
import {Betslip} from './betslip';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {
  item=[];
  total=0;
  _idCounter=1;
  _value:Betslip;

  constructor() { }

  AddToBetSlip(bet:any,punterchoice:string,odds:number){
    console.log('In the method');
    this._value={
      Id:this._idCounter,
      TypeofEvent:'Soccer',
      Event:bet,
      punterBetSelection:punterchoice,
      selectionodds:odds,
      cost:7
    };
    this.item.push(this._value);
    this._idCounter++;
  }

  clearBetSlip(){
    this.total=0;
    this.item.splice(0,this.item.length);
  }

  removeEvent(event:any){
    	this.item.splice(this.item.lastIndexOf(event),1)
  }
}
