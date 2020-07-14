import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BetslipComponent } from './betslip/betslip.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import{FormsModule} from '@angular/forms';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { CountriesComponent } from './countries/countries.component';
import { SportcountriesComponent } from './sportcountries/sportcountries.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { EventComponent } from './event/event.component';
import { MarketComponent } from './market/market.component';
import { StoreModule } from '@ngrx/store';
import {reducer} from './store/reducers/countries.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountriesEffects } from './store/effects/countries.effects';
import { BetgamesComponent } from './betgames/betgames.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    BetslipComponent,

    FooterComponent,

    MaincontentComponent,

    FixturesComponent,

    CountriesComponent,

    SportcountriesComponent,

    TournamentsComponent,

    EventComponent,

    MarketComponent,

    BetgamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      countries:reducer
    }),
    EffectsModule.forRoot([CountriesEffects])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
