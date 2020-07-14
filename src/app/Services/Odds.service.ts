import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Odds} from '../Models/OddsDetails/odds';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

constructor(private http:HttpClient) { }
private url ="http://localhost:5000/api/OddsDetail?tournamentID="


GetOdds(tournamentID:number):Observable<Odds[]>{
  return this.http.get<Odds[]>(this.url+tournamentID);

}

}
