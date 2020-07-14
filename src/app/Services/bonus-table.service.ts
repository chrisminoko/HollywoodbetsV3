import { Injectable } from '@angular/core';
import { BounusTable } from '../Models/BounusTable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BonusTableService {
  private bonusJson = "assets/bonus.json";
  constructor(private httpClient:HttpClient) { }
  getBonusTable(): Observable<BounusTable[]> {
    return this.httpClient.get<BounusTable[]>(this.bonusJson);
  }
}
