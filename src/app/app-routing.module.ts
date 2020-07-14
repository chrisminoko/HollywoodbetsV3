import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component'
import{MaincontentComponent} from './maincontent/maincontent.component';
import{CountriesComponent} from './countries/countries.component'
import {TournamentsComponent} from './tournaments/tournaments.component';
import {EventComponent} from './event/event.component';
import {BetgamesComponent} from './betgames/betgames.component'
  import { from } from 'rxjs';


const routes: Routes = [
  {path : 'maincontent', component:MaincontentComponent},
  {path : '', redirectTo:'/maincontent',pathMatch:'full'},
  {path : 'countries/:sportId', component:CountriesComponent},
  {path : 'event/:tournamentid', component:EventComponent},
  {path : 'betgames',component:BetgamesComponent},
  {path : 'tournaments/:sportId/:countryid', component:TournamentsComponent},

];
//https://localhost:5001/sporttournament?sportid=3&countryid=2
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
