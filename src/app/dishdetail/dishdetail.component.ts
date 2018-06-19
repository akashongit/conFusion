import { Component, OnInit } from '@angular/core';

import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishservice: DishService,
  private route: ActivatedRoute,
  private location: Location) { }

  ngOnInit() {
    // get array of dishIds
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // router
    this.route.params
    .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish=> { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    let len = this.dishIds.length;
    this.prev = this.dishIds[(len + index - 1)%len];
    this.next = this.dishIds[(len + index + 1)%len];
  }

}
