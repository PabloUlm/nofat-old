import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.styl']
})
export class NewWorkoutComponent implements OnInit {
  public exercises: FormArray;
  public newWorkoutForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService
    ) {}

  public ngOnInit(): void {
    this.newWorkoutForm = this.formBuilder.group({
      mode: '',
      exercices: this.formBuilder.array([this.getExercEntry()])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newWorkoutForm.controls; }

  public setMode(modeValue: string): void {
    this.newWorkoutForm.patchValue({mode: modeValue});

    console.log(this.newWorkoutForm);
  }

  public addExercise(): void {
    console.log(this.newWorkoutForm);
    this.exercises = this.newWorkoutForm.get('exercises') as FormArray;
    this.exercises.push(this.getExercEntry());
  }

  public getExercEntry(): FormGroup {
    return this.formBuilder.group({
      exercise: '',
      qty: ''
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
