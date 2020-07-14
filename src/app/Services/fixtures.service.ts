import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { bettypes } from '../Models/bettypes';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FixturesService {
  bettypes: bettypes[];
  constructor(private _httpclient : HttpClient) { }
  private bettypeurl='http://localhost:5000/api/BetTypes?tournamentID=';
  getBetTypes(id:number):Observable<bettypes[]>{
    return this._httpclient.get<bettypes[]>(this.bettypeurl+id);
  }
}
