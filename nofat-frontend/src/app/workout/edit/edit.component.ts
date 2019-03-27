import { Component, OnInit } from '@angular/core';
import { WorkoutService, ExerciseService } from '../../services';
import { IRoutine } from '../../../typings';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Exercise } from '../../_models';

export const MAGIC_NUMBER_REPETITIONS = 80; // bigger is less difficulty
export const MAGIC_NUMBER_MINUTES = 8; // bigger is more difficulty

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.styl']
})
export class EditWorkoutComponent implements OnInit {
  public exercises: FormArray;
  public newWorkoutForm: FormGroup;
  public submitted = false;
  public exercisesData: Exercise[];
  public difficulty = 0;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) {}

  public ngOnInit(): void {
    this.getAllExercises();

    this.newWorkoutForm = this.formBuilder.group({
      mode: '',
      exercises: this.formBuilder.array([this.getExercEntry()])
    });

    this.initValues();
    this.onChanges();
  }

  public initValues(): void {
    this.workoutService.getWorkout().subscribe((workout: IRoutine) => {
      if (workout) {
        this.newWorkoutForm.patchValue({
          mode: workout.mode
        });

        if (workout.exercises && workout.exercises.length) {
          let index = 0;
          for (const exer of workout.exercises) {
            if (index !== 0) {
              // The first one is created in the form builder
              this.addExercise();
            }
            if (this.newWorkoutForm.controls['exercises']['controls']) {
              this.newWorkoutForm.controls['exercises']['controls'][
                index
              ].patchValue({
                exercise: exer.exerciseId,
                qty: exer.qty
              });
            }
            index++;
          }
        }
      }
    });
  }

  public onChanges(): void {
    this.newWorkoutForm.valueChanges.subscribe(val => {
      let total = 0;
      if (val.mode === 'minutes') {
        for (const exer of val.exercises) {
          const minutes = parseInt(exer.qty, 10);
          const exerData: Exercise[] = this.exercisesData.filter(
            (val: Exercise) => val['_id'] === exer.exercise
          );
          if (exerData.length) {
            total += (exerData[0].difficulty * minutes) / MAGIC_NUMBER_MINUTES;
          }
        }
      } else if (val.mode === 'repetitions') {
        for (const exer of val.exercises) {
          const rep = parseInt(exer.qty, 10);
          const exerData: Exercise[] = this.exercisesData.filter(
            (val: Exercise) => val['_id'] === exer.exercise
          );
          if (exerData.length) {
            total += (exerData[0].difficulty * rep) / MAGIC_NUMBER_REPETITIONS;
          }
        }
      }

      this.difficulty = total;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newWorkoutForm.controls;
  }

  public setMode(modeValue: string): void {
    this.newWorkoutForm.patchValue({ mode: modeValue });
  }

  public addExercise(): void {
    this.exercises = this.newWorkoutForm.controls['exercises'] as FormArray;
    this.exercises.push(this.getExercEntry());
  }

  public getExercEntry(): FormGroup {
    return this.formBuilder.group({
      exercise: '',
      qty: [0, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  public getAllExercises(): void {
    this.exerciseService.getAll().subscribe(res => {
      this.exercisesData = res;
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.newWorkoutForm.invalid) {
      return;
    }

    this.workoutService
      .addWorkout(this.newWorkoutForm.value)
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
}
