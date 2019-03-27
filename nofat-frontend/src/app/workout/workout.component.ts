import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AchievementService } from '../services/achievement.service';
import { Achievement } from '../_models';
import { WorkoutService, ExerciseService } from '../services';
import { IRoutine, IExercise } from 'src/typings';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.styl']
})
export class WorkoutComponent implements OnInit {
  @ViewChild('videoElement') public videoElement: any;
  public defaultExerciseTime = 10; // = 600; // 10 minutes
  public routine$: BehaviorSubject<IRoutine> = new BehaviorSubject(null);
  public exercisesData$: BehaviorSubject<IExercise[]> = new BehaviorSubject([]);
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
    public workoutService: WorkoutService,
    public exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.exerciseService.getAll().subscribe(res => {
      this.exercisesData$.next(res);
    });
    this.workoutService.getWorkout().subscribe((routine: IRoutine) => {
      this.routine$.next(routine);
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

  public getExerciseName(id: string): string {
    // TODO: make this logic in server when getting the routine
    const exercise = this.exercisesData$
      .getValue()
      .filter(exer => exer._id === id);

    return exercise[0].name;
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
