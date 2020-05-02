import { CommonModules } from './../common/common.module';
import { HomeService } from './home.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TopHighlightsComponent } from './top-highlights/top-highlights.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonModules,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage,TopHighlightsComponent],
  providers:[HomeService]
})
export class HomePageModule {}
