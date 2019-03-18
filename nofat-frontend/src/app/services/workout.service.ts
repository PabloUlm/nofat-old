import { Workout } from '../_models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WorkoutService {
  constructor(private http: HttpClient) { }

  addWorkout(workout: Workout): Observable<any> {
    return this.http.post(`${environment.apiUrl}/workout/add`, workout);
  }

  /**
   * Get current week workout
   */
  getWorkout(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/workout/get`);
  }
}
