import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {countries} from './countries';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countryurl='http://localhost:5000/api/Country?sportid=';
  
  constructor(private _http:HttpClient) { }
  clicked:boolean=false;
  countries:countries[];
  // getCountries():Observable<countries[]>{
  //   return this._http.get<countries[]>(this.countryurl);
  // }

  getCountrybyID(id:number):Observable<countries[]>{
    return this._http.get<countries[]>(this.countryurl+id);
  }
}
