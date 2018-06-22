import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

// import { LEADERS } from '../shared/leaders';
import {RestangularModule, Restangular} from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]>
  {
    return this.restangular.all('leaders').getList();
  }

  getFeaturedLeader(): Observable<Leader>
  {
    return this.restangular.all('leaders').getList({featured:true})
    .map(leader => leader[0]);
  }
}
