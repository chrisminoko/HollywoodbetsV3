import {Injectable} from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {map,switchMap} from 'rxjs/operators';
import {CountriesService} from '../../Services/countries.service';
import {ActionTypes} from '../actions/countries.actions';
import * as Action from '../actions/countries.actions';
import {countries} from '../../Models/countries';

@Injectable()
export class CountriesEffects{

    @Effect()
    loadCountries$=this.actions$.pipe(
        ofType(ActionTypes.GET_COUNTRIES),
        switchMap((action:Action.GetCountries)=>
            this.CountriesService.getCountrybyID(action.payload).pipe(
                map((Country :countries[])=>new Action.GetCountriesSuccess(Country))
            )
        )
    );


    /**
     *
     */
    constructor(private actions$:Actions,private CountriesService:CountriesService) {
      


    }
}