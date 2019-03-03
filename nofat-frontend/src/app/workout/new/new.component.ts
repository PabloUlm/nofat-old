import { Component, OnInit } from '@angular/core';
import { WorkoutService, ExerciseService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Exercise } from '../../_models';

export const MAGIC_NUMBER_REPETITIONS = 80; // bigger is less difficulty
export const MAGIC_NUMBER_MINUTES = 8; // bigger is more difficulty

@Component({
  selector: 'app-new-workout',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.styl']
})
export class NewWorkoutComponent implements OnInit {
  public exercises: FormArray;
  public newWorkoutForm: FormGroup;
  public submitted = false;
  public exercisesData: Exercise[];
  public difficulty = 0;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  public ngOnInit(): void {
    this.getAllExercises();
    this.workoutService.getWorkout().subscribe(res => {
      console.log('getting ---', res);
    });
    this.newWorkoutForm = this.formBuilder.group({
      mode: '',
      exercises: this.formBuilder.array([this.getExercEntry()])
    });
    this.onChanges();
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
      console.log('### res ', res);
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
