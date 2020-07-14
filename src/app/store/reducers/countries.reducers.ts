import {countries} from '../../Models/countries';
import * as CountiesActions from '../actions/countries.actions'

export const initialState: countries={
    countryid:0,
    name:"",
    flagUrl:""
}

export function reducer(state:countries[]=[initialState],action:CountiesActions.ActionUnion){

    switch (action.type) {
        case CountiesActions.GET_COUNTRIES_SUCCESS:
            console.log("Payload at reducer before returning and joining with state:",action.payload);
            return action.payload;
    
        default:
            return state;
    }
}