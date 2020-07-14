import { event } from '../Models/event';
import {Odds} from '../Models/OddsDetails/odds'

export interface Eventmarket{
    event:event;
    marketOdd:Odds[];

}