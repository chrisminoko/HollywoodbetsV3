import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Market} from '../Models/Market';
import {MarketService} from '../Services/market.service';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private http:HttpClient , private marketService:MarketService) { }
  market : Market[];
  ngOnInit(): void {
    this.GetAllMarket()
  }

  GetAllMarket(){
    return this.marketService.GetAllMarkets().subscribe((data:any)=>{
      this.market=data;
      console.log('All Markets',this.market)
    })
  }

}
