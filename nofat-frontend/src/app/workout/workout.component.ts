import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.styl']
})
export class WorkoutComponent implements OnInit {

  @ViewChild('videoElement') public videoElement: any;
  public video: any;
  public defaultExerciseTime = 10; // = 600; // 10 minutes
  public showTimer = false;
  public showCamera = false;
  public timer: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  public transformTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    return minutes + ':' + (seconds - minutes * 60);
  }

  public start(): void {
    this.initCamera({ video: true, audio: false });
  }

  public sound(): void {
    this.initCamera({ video: true, audio: true });
  }

  public initCamera(config: any): void {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }

  public pause(): void {
    this.video.pause();
  }

  public resume(): void {
    this.video.play();
  }

  public startVideo() {
    this.start();
  }

  public startExercise() {
    this.showTimer = true;
    this.timer = interval(1000).pipe(
      map((x) => {
        if (this.defaultExerciseTime <= x) {
          this.startPosexercise();
        }
        return this.transformTime(this.defaultExerciseTime - x);
       })
    );
  }

  public startPosexercise() {
    this.showTimer = false;
    this.showCamera = true;
    this.startVideo();
  }

  public onNotify(event: Event) {

  }

  public onFinished() {

  }

  public onStart() {

  }
}
