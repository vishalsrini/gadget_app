import { YoutubeListModalComponent } from './youtube-list-modal/youtube-list-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'ionic4-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [YoutubeListModalComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    HttpClientModule,
    IonicModule
  ],
  exports:[
    StarRatingModule,
    HttpClientModule,
    YoutubeListModalComponent
  ],
  entryComponents:[YoutubeListModalComponent],
  providers:[]
})
export class CommonModules { }
