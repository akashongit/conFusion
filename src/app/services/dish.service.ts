import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
// import { Http, Response } from '@angular/http';

import {RestangularModule, Restangular} from 'ngx-restangular';

// import { resolve } from 'url';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular) { }

    getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }
  
    getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes',id).get();
    }
  
    getFeaturedDish(): Observable<Dish> {
      return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
    }
  
    getDishIds(): Observable<number[]> {
      return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) });
    }

}
