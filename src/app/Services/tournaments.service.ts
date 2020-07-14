import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tournaments} from '../Models/tournaments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  constructor(private _htttp: HttpClient) { }
  tournaments :tournaments[];
  private tournamenturl='http://localhost:5000/api/Tournament?countryid=';
  private _sportID='sportid=';
  private _countryid='countryid=';

  getTournaments( countryid:number):Observable<tournaments[]>{
    return this._htttp.get<tournaments[]>(`${this.tournamenturl}${countryid}`);
  }
}