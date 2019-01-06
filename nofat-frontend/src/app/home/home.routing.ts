import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent, NewWorkoutComponent } from '../workout';
import { HomeComponent } from '.';
import { AuthGuard } from '../_guards';

const appRoutes: Routes = [
  { path: '', redirectTo: 'workout', pathMatch: 'full' },
  { path: 'workout', component: WorkoutComponent },
  { path: 'workout/new', component: NewWorkoutComponent }
];

export const homeRouting = RouterModule.forChild(appRoutes);
