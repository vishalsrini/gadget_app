import { FormsModule } from '@angular/forms';
import { YoutubeListModalComponent } from './youtube-list-modal/youtube-list-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'ionic4-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';


@NgModule({
  declarations: [YoutubeListModalComponent,FilterModalComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    HttpClientModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    StarRatingModule,
    HttpClientModule,
    FormsModule,
    YoutubeListModalComponent,
    FilterModalComponent
  ],
  entryComponents:[YoutubeListModalComponent,FilterModalComponent],
  providers:[]
})
export class CommonModules { }
