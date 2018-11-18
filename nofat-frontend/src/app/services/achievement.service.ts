import { User, Achievement } from '../_models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AchievementService {

  constructor(
    private http: HttpClient
    ) { }

   addAchievement(user: User, achievement: Achievement) {
    return this.http.post(`${environment.apiUrl}/achievement` + user.id, achievement);
   }
}
// module.exports = NofatService;
