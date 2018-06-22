import { Component, OnInit, Inject} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Dish} from '../shared/dish';
import {Comment} from '../shared/comment';
import {DishService} from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

import { visibility, flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  comment: Comment;
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  visibility = 'shown';

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
  private fb: FormBuilder,
  @Inject('BaseURL') private BaseURL) { 
    
    
  }

  ngOnInit() {
    // comment form creation
    this.createForm();
    // get array of dishIds
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // router
    this.route.params
    .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id'])})
    .subscribe(dish=> { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown' },
    errmess => this.errMess = <any>errmess);
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
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);

    this.dishcopy.save()
    .subscribe(dish => this.dish = dish);

    console.log(this.comment);
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
