import { FavouritesService } from './favourites.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss']
})
export class FavouritesPage {
  gadgetList: any = [];
  constructor(private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.favouritesService.getFavourites().subscribe(success=>{
        console.log(success);
        if(success){
        this.gadgetList=success.gadgetsList;
        this.filterFavourites()
        }
    },error=>{

    })
  }

  filterFavourites(){
    this.gadgetList=this.gadgetList.filter(ele=>ele.isFavourite);
  }
  
  clickFavourites(gadget){
    gadget.isFavourite=!gadget.isFavourite;
    this.filterFavourites();
  }
}
