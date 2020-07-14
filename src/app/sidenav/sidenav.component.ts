import { Component, OnInit } from '@angular/core';
import { SportsService } from '../Services/sports.service';
import { HttpClient } from '@angular/common/http';
import {CountriesService} from '../Services/countries.service';
import { Sports } from '../Models/sport';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  sport: Sports[];
  constructor(
    private _httpclient: HttpClient,
    private _sportservice: SportsService,
    private _countryService:CountriesService,
    private _router: Router) {


  }
  term: string;
  ngOnInit(): void {

    this.getSport();

  }
  onClick() :void{
    this._countryService.clicked=true;
  }
  getSport() {
    return this._sportservice.getSport().subscribe((data: any) => {
      this.sport = data;
      console.log('sport', this.sport)
    })
  }


}
