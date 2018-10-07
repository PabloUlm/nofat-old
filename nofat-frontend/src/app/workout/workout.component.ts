import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.styl']
})
export class WorkoutComponent implements OnInit {

  @ViewChild('videoElement') videoElement: any;
  video: any;
  public config = {leftTime: 1000 * 10};
  constructor() { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }

  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config: any) {
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

  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }

  public startVideo() {
    this.start();
  }

  public startExercice() {
    console.log('start exercice');
  }

  public onNotify(event: Event) {

  }

  public onFinished() {

  }

  public onStart() {

  }
}
