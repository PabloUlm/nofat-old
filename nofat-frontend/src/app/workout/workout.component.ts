import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AchievementService } from '../services/achievement.service';
import { Achievement } from '../_models';
import { WorkoutService } from '../services';
import { IRoutine } from 'src/typings';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.styl']
})
export class WorkoutComponent implements OnInit {
  @ViewChild('videoElement') public videoElement: any;
  public defaultExerciseTime = 10; // = 600; // 10 minutes
  public showTimer = false;
  public timer: Observable<string>;
  public achievement: Achievement = {
    id: 12245,
    description: 'tha description',
    photoUrl: 'photo.com',
    userId: 33,
    videoUrl: 'video',
    workoutId: 123
  };

  constructor(
    public achievementService: AchievementService,
    public workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workoutService.getWorkout().subscribe((workout: IRoutine) => {
      console.log(workout);
    });
  }

  public workoutDone(): void {
    this.achievementService
      .addAchievement(this.achievement)
      .pipe(first())
      .subscribe(
        data => {
          console.log('successful');
        },
        error => {
          console.log('shit');
        }
      );
  }

  public transformTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    return minutes + ':' + (seconds - minutes * 60);
  }

  public startExercise() {
    this.showTimer = true;
    this.timer = interval(1000).pipe(
      map(x => this.transformTime(this.defaultExerciseTime - x))
    );
  }
}
