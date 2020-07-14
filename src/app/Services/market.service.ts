import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Market} from '../Models/Market'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http:HttpClient) { }
  private marketurl="http://localhost:5000/api/Markets";
  public GetAllMarkets():Observable<Market[]>{
    return this.http.get<Market[]>(this.marketurl);
  }
}
