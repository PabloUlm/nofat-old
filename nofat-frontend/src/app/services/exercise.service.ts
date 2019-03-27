import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Exercise } from '../_models';
import { Observable } from 'rxjs';
import { IExercise } from '../../typings';

@Injectable()
export class ExerciseService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(`${environment.apiUrl}/exercise`);
  }
}
