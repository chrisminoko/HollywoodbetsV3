import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../Services/countries.service';
import {countries} from '../Models/countries';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as CountriesActions from '../store/actions/countries.actions';
import {AppState} from '../store/app.state';
import {Store, State} from '@ngrx/store';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
 countries$ : Observable<countries>;
 country:any[]
 sportId:number;
 
 constructor(private _countriesservice:CountriesService,
  private route:ActivatedRoute ,
  private router:Router,
  private store :Store<AppState>) {
    store.select(state=>state.countries).subscribe((data:any)=>{
    this.countries$=data;
    this.country=data;
    });

   }

   CountryTest(){
     this.getCountries();
     console.log('logged',this.countries$)
   }

  getCountries(){
    var sportId =+this.route.snapshot.paramMap.get('sportId');
    this.sportId=sportId;

    
    // return this._countriesservice.getCountrybyID(this.sportId).subscribe((data:any)=>{
    //   console.log(data);
    //   this.countries$=data;
    //   console.log('countries logged', this.countries$);
    // });

    return this.store.dispatch(new CountriesActions.GetCountries(sportId))


  }
  onClick() :void{
    this._countriesservice.clicked=true;
  }

  ngOnInit(): void {
 
    this.getCountries();
  }
  ngDoCheck():void{
    if(this._countriesservice.clicked){
      this.getCountries();
      this._countriesservice.clicked=false;
    }
    
  }
  selectedCountry(countryId:number){
    this.router.navigateByUrl('tournaments'+"/"+this.sportId+"/"+countryId);
  }

  defaultstate(){
    console.log(this.countries$);
  }

  testState(){
    this.store.dispatch(new CountriesActions.GetCountries(2))
  }

}
