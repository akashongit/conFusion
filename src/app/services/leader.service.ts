import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>
  {
    return Observable.of(LEADERS).delay(2000);
  }

  getFeaturedLeader(): Observable<Leader>
  {
    return Observable.of(LEADERS.filter((l)=>(l.featured))[0]).delay(2000);
  }
}
