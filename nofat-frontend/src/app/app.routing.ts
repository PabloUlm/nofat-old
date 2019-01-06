import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { WorkoutComponent, NewWorkoutComponent } from './workout';
import { RankingComponent } from './ranking/ranking.component';

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RankingComponent },
            { path: 'workout', component: WorkoutComponent },
            { path: 'workout/new', component: NewWorkoutComponent },
            { path: 'ranking', component: RankingComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
