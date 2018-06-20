import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  commentForm: FormGroup;

  formErrors = {
    'author':'',
    'comment':'',
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.'
    },
  }; 

  constructor(private dishservice: DishService,
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder) { 
    // comment form creation
    this.createForm();
  }

  ngOnInit() {
    // get array of dishIds
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // router
    this.route.params
    .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish=> { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm(){
    this.commentForm = this.fb.group(
      {
        author : ['',
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        comment : ['',[Validators.required]],
        date : '',
        rating : [5]
      });
      this.commentForm.valueChanges
      .subscribe( data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onSubmit(){
    var now: Date = new Date();
    this.commentForm.value.date = now.toUTCString();
    this.dish.comments.push(this.commentForm.value);
    console.log(this.commentForm.value);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date : ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
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
