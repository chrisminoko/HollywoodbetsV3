import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {BetslipService} from '../Services/betslip.service';
import {FixturesService} from '../Services/fixtures.service';
import { from, Observable } from 'rxjs';
import { bettypes } from '../Models/bettypes';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  public Fixtures :any=[];
  bettypes: bettypes[];
  
  constructor(private _httpclient : HttpClient ,private _betSlipService:BetslipService , private fixture :FixturesService) { }

  ngOnInit(): void {
     
      this._httpclient.get("assets/Bets.json").subscribe(data=>{
      console.log(data);
      this.Fixtures=data;
  
        
      })

      this.GetBetypes();
      
  }

  addEventToSlip(event:string,punterchoice:string,odds:number){
    console.log('awere')
  
  }

  GetBetypes(){
    return this.fixture.getBetTypes(1).subscribe((data:any)=>{
      this.bettypes=data;
    })
  }

}
