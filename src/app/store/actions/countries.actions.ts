import {Action} from '@ngrx/store';
import {countries} from '../../Models/countries';


export const GET_COUNTRIES = '[COUNTRIES] Get'
export const GET_COUNTRIES_SUCCESS= '[COUNTRIES] Get Success'

export enum ActionTypes{
    GET_COUNTRIES= '[COUNTRIES] Get',
    GET_COUNTRIES_SUCCESS='[COUNTRIES] Get Success'
}

export class GetCountries implements Action{
    readonly type= ActionTypes.GET_COUNTRIES
    /**
     *
     */
    constructor(public payload:number) { }
}

export class GetCountriesSuccess implements Action{
    readonly type=ActionTypes.GET_COUNTRIES_SUCCESS
    constructor(public payload :countries[]){}
}

export type ActionUnion= GetCountries|GetCountriesSuccess;