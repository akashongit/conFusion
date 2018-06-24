import { Injectable } from '@angular/core';
import {RestangularModule, Restangular} from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }
  feedbacks: Feedback[];
  feedbacksCopy = null;
  errMess: any;

  getFeedback(): Observable<Feedback[]>{
    return this.restangular.all('feedback').getList();
   }

  submitFeedback(feedback: Feedback): Observable<Feedback[]> {
    this.getFeedback().subscribe( feedbacks => { this.feedbacks = feedbacks; this.feedbacksCopy = feedback;},
      errmess => this.errMess = <any>errmess);
    // this.feedbacksCopy.push(feedback);
    console.log(this.feedbacks);
    return this.feedbacksCopy.save();
  }
}
