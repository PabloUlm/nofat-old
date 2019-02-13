import { Workout } from '../_models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkoutService {
  constructor(private http: HttpClient) {}

  addWorkout(workout: Workout) {
    console.log('joupta');
    return this.http.post(`${environment.apiUrl}/workout/add`, workout);
  }
}
