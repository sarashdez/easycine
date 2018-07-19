import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";

@Component({
  selector: 'page-trailer',
  templateUrl: 'trailer.html'
})
export class TrailerPage {

  videoID : string = '1sUbOSVTdgg';

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private youtube : YoutubeVideoPlayer) {
    this.reproducirVideo();
  }

  reproducirVideo() {
    this.youtube.openVideo(this.videoID)
  }


}
