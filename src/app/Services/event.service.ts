import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {event} from '../Models/event';
import {bettypes} from '../Models/bettypes';
import { Observable } from 'rxjs';
import { Betslip } from '../Models/betslip';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event : event[];
  bettypes:bettypes[];
  clicked:boolean=false;

  constructor(private _http:HttpClient) { }
  private eventur='http://localhost:5000/api/Events?TournamentID=';
  private bettypeurl='http://localhost:5000/api/BetTypes?tournamentID=';

  getTournamentbyID(id:number):Observable<event[]>{
    return this._http.get<event[]>(this.eventur+id);
  }

  getBetTypes(id:number):Observable<bettypes[]>{
    return this._http.get<bettypes[]>(this.bettypeurl+id)
  }
}
