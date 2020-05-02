import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { YoutubePlayerWeb } from 'capacitor-youtube-player'; // Web version

import { Plugins, Capacitor } from '@capacitor/core'; // Native version


@Component({
  selector: 'app-youtube-list-modal',
  templateUrl: './youtube-list-modal.component.html',
  styleUrls: ['./youtube-list-modal.component.scss'],
})
export class YoutubeListModalComponent implements OnInit {
  @Input() videoData: any[];

  constructor(navParams: NavParams, private modalCtrl: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('videoData'));
  }

  ngOnInit() {

  }

  dismissModal() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss().then(() => { this.modalCtrl = null; });
    }
  }

  openVideo(id,video){
    
  }

  // video player plugin

  // resetAllVideos(id) {
  //   this.videoData.forEach(element => {
  //     element.showPlayer = false;
  //     if(element.id!=id){
  //          if (Capacitor.platform === 'web') {
  //       this.destroyYoutubePlayerPluginWeb(element.id);
  //     } else { // Native
  //       this.destroyYoutubePlayerPlugin(element.id);
  //     }
  //   }
   
  //   })
  // }
  // openVideo(id, video) {
  //   this.resetAllVideos(id);
  //   video.showPlayer = true;
  //   if (Capacitor.platform === 'web') {
  //     this.initializeYoutubePlayerPluginWeb(id);
  //   } else { // Native
  //     this.initializeYoutubePlayerPluginNative(id);
  //   }
  //  console.log(video)

    
  // }
  // async initializeYoutubePlayerPluginWeb(id) {
  //   const options = { playerId: id,playerSize:{},autoplay:1, videoId: id };
  //   const result = await YoutubePlayerWeb.initialize(options);
  //   console.log('playerReady', result);
  // }

  // async destroyYoutubePlayerPluginWeb(id) {
  //   const result = await YoutubePlayerWeb.destroy(id);
  //   console.log('destroyYoutubePlayer', result);
  // }
  // async destroyYoutubePlayerPlugin(id) {
  //   const { YoutubePlayer } = Plugins;
  //   const result = await YoutubePlayer.destroy(id);
  //   console.log('destroyYoutubePlayer', result);
  // }
  // async initializeYoutubePlayerPluginNative(id) {

  //   const { YoutubePlayer } = Plugins;
  //   let options = { width: '100%', height: '100%', autoplay:1, videoId: id };
  //   let playerReady = await YoutubePlayer.initialize(options);
  // }

}
