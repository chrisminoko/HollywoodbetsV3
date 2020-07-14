import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../Services/tournaments.service';
import {tournaments} from '../Models/tournaments';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  constructor(private _tournamentservice : TournamentsService,private route:ActivatedRoute) { }
  tournament:tournaments[];
  GetTournaments(){
    var sportId =+this.route.snapshot.paramMap.get('sportId');
    var countryid=+this.route.snapshot.paramMap.get('countryid');
    
    console.log('Country ID logged',sportId);
   
    return this._tournamentservice.getTournaments(countryid).subscribe((data:any)=>{
      console.log(data);
      this.tournament=data;
      console.log('tournaments', this.tournament);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(routParams=>{
    this.GetTournaments();
    })
  }



}
