import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sports} from '../Models/sport';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SportsService {
  private sporturl='http://localhost:5000/api/SportType/';
  constructor(private _http: HttpClient) { }


  getSport():Observable<Sports[]>{
    return this._http.get<Sports[]>(this.sporturl);
  }
}
