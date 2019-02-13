import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Exercise } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiUrl}/exercise`);
  }
}
