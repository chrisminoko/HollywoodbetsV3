import { Component, OnInit } from '@angular/core';
import { EventService } from '../Services/event.service';
import { event } from '../Models/event';
import { Observable } from 'rxjs';
import { bettypes } from '../Models/bettypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Eventmarket } from '../Models/eventmarkets';
import { Odds } from '../Models/OddsDetails/odds';
import { OddsService } from '../Services/Odds.service';
import { BetslipService } from '../Services/betslip.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private eventservice: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private betslipService:BetslipService,
    private oddservice: OddsService) { }
  _tournamentName: string;
  sportName: string;
  event: event[];
  bettypes: bettypes[];
  TournamentID: number;
  betypeID: number;
  eventMarkets: Eventmarket[] = [];
  odds: Odds[];
  currentlyselectedBetTypes: bettypes={
    betypeid:-1,
    bettype:""
  };
  
  eventMarketlocal: Eventmarket = {
    event: null,
    marketOdd: []
  };

selectBetType(bet:bettypes){
  console.log('default',this.currentlyselectedBetTypes)
  this.currentlyselectedBetTypes=bet
  console.log('selecting bettpe',bet);
}

  pushEvents(data: any) {
    for (let index = 0; index < data.length; index++) {
      this.eventMarketlocal = {
        event: data[index],
        marketOdd: []
      }
      console.log('Event Market Local',this.eventMarketlocal)
      this.eventMarkets.push(this.eventMarketlocal);
      
    }
    console.log('eventmarket length',this.eventMarkets.length)

  }


  getMarkets() {
    var TournamentID = +this.route.snapshot.paramMap.get('tournamentid');
    console.log('Tournament ID for bettypes :', TournamentID)
    this.TournamentID = TournamentID;
    return this.oddservice.GetOdds(this.TournamentID).subscribe((data: any) => {
      this.odds = data;
      this.waitForOneSecond().then((value) => {
        this.getOdds(data);
      });

      console.log('Markets: ', this.odds)
    })
  }

  getOdds(odds: any) {
    for (let index = 0; index < odds.length; index++) {
      console.log('Event Market Length a:',this.eventMarkets.length)
      for (let i = 0; i < this.eventMarkets.length; i++) {
          console.log('yes')
          console.log('events id',this.eventMarkets[i].event.eventId)
          console.log('market id',odds[index].eventId)
        if (this.eventMarkets[i].event.eventId == odds[index].eventId) {
          this.eventMarkets[i].marketOdd.push(odds[index])
          console.log('It logged',this.eventMarkets[i].marketOdd)
        }

      }
    }
    console.log('eventsmarkets', this.eventMarkets)
  }

  getEvents() {
    var TournamentID = +this.route.snapshot.paramMap.get('tournamentid');
    console.log('Snapped ID', TournamentID)
    this.TournamentID = TournamentID;
    return this.eventservice.getTournamentbyID(this.TournamentID).subscribe((data: any) => {
      console.log(data);
      this.event = data;
      this.waitForOneSecond().then((value) => {
        this.pushEvents(data);
      });
      console.log('event logged ', this.event);
    });
  }

  getBetTypes() {
    var TournamentID = +this.route.snapshot.paramMap.get('tournamentid');
    console.log('Tournament ID for bettypes :', TournamentID)
    this.TournamentID = TournamentID;
    return this.eventservice.getBetTypes(this.TournamentID).subscribe((data: any) => {
      console.log(data)
      this.bettypes = data;
      this.currentlyselectedBetTypes = data[0];
      console.log('currently selected Bet',this.currentlyselectedBetTypes)
      console.log('BetTypes Logged : ', this.bettypes)
    })
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("wait fir 300ms");
      }, 300);
    });
  }


  ngOnInit(): void {
    this.getEvents();
    this.waitForOneSecond().then((value) => {
      this.getMarkets()
    });

    this.getBetTypes();

  }


  onClick(): void {
    this.eventservice.clicked = true;
  }

  ngDoCheck(): void {
    if (this.eventservice.clicked) {
      this.getEvents();
      this.getBetTypes();
      this.eventservice.clicked = false;
    }

  }


  FilterbyDate() {
    var TournamentID = +this.route.snapshot.paramMap.get('tournamentid');
    console.log('Snapped ID', TournamentID)
    this.TournamentID = TournamentID;
    this.eventservice.getTournamentbyID(this.TournamentID).subscribe((data: any) => {

      this.event = data;
      this.event.sort((a, b) => {
        return a.eventDate == b.eventDate ? 0 :
          a.eventDate > b.eventDate ? 1 : -1
      })

      
      console.log('Filted Date: ', this.event)

    });
  }
  FilterbyTime() {
    var TournamentID = +this.route.snapshot.paramMap.get('tournamentid');
    console.log('Snapped ID', TournamentID)
    this.TournamentID = TournamentID;
    this.eventservice.getTournamentbyID(this.TournamentID).subscribe((data: any) => {

      this.event = data;
      this.event.sort((a, b) => {
        return a.eventDate.getTime == b.eventDate.getTime ? 0 :
          a.eventDate.getTime > b.eventDate.getTime ? 1 : -1
      })
      console.log('Filted Date: ', this.event)

    });
  }


  addEventToBetSlip(event: any, punterChoice: string, odds: number) {

    event={
     EventId:event.EventId,
     TournamentId: event.TournamentId,
     EeventName:event.EventName,
     EeventDate: event.EeventDate,
     sportName:this.sportName,
     tournamentName:this._tournamentName,
     betType:this.currentlyselectedBetTypes.bettype,
    }
   this.betslipService.AddToBetSlip(event, punterChoice, odds,
      this.sportName, this._tournamentName,this.currentlyselectedBetTypes.bettype);
 }

}
