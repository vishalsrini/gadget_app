import { CommonModules } from './../common/common.module';
import { FavouritesService } from './favourites.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesPage } from './favourites.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonModules,
    RouterModule.forChild([{ path: '', component: FavouritesPage }])
  ],
  declarations: [FavouritesPage],
  providers:[FavouritesService]
})
export class FavouritesPageModule {}
