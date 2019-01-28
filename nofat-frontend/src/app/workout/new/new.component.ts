import { Component, OnInit } from '@angular/core';
import { WorkoutService, ExerciseService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Exercise } from '../../_models';

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
  }

  // convenience getter for easy access to form fields
  get f() { return this.newWorkoutForm.controls; }

  public setMode(modeValue: string): void {
    this.newWorkoutForm.patchValue({mode: modeValue});
  }

  public addExercise(): void {
    this.exercises = this.newWorkoutForm.controls['exercises'] as FormArray;
    this.exercises.push(this.getExercEntry());
  }

  public getExercEntry(): FormGroup {
    return this.formBuilder.group({
      exercise: '',
      qty: ''
    });
  }

  public getAllExercises(): void {
    this.exerciseService.getAll().subscribe(res => {
      console.log('### res ', res);
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
      });
  }
}
