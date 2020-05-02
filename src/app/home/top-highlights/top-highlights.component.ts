import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-top-highlights',
  templateUrl: './top-highlights.component.html',
  styleUrls: ['./top-highlights.component.scss'],
})
export class TopHighlightsComponent implements OnInit {
  gadgetList: any;
  customGadgetList: any;
  slideOpts: any;
  constructor(private homeService: HomeService) {
    this.slideOpts = {
      pagination: true,
      autoplay: {
        delay: 3000,
      },
      fadeEffect: {
        crossFade: true
      },
    }
  }

  ngOnInit() {
    // getting gadgets master list from service
    this.homeService.getGadgets().subscribe(success => {
      console.log(success);
      if (success) {
        this.gadgetList = success.gadgetsList.splice(0, 3);
      }
    }, error => {
    });

  }

  ionViewDidEnter(){
    this.slideOpts.autoplay.start();
  }
}
