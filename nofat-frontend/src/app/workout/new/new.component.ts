import { Component } from '@angular/core';
import { WorkoutService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.styl']
})
export class NewWorkoutComponent {

  public submitted = false;
  newWorkoutForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService
    ) {}

  // convenience getter for easy access to form fields
  get f() { return this.newWorkoutForm.controls; }

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