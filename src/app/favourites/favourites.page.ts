import { FavouritesService } from './favourites.service';
import { Component } from '@angular/core';
import { YoutubeListModalComponent } from '../common/youtube-list-modal/youtube-list-modal.component';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss']
})
export class FavouritesPage {
  gadgetList: any = [];
  constructor(private favouritesService: FavouritesService, public modalController: ModalController,
    public loadingController: LoadingController, public toastController: ToastController) { }

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

  videoDetail:any=[];
  // fetching video details for selected product
  viewDetail(productId) {
    this.videoDetail = [];
    console.log(productId)
    this.showLoader()
    this.favouritesService.getGadgetDetail(productId).subscribe(success => {
      // remove this once integrated with api
      let selectedProduct = success.gadgetDetail.find(ele => ele.productId == productId);

      if (selectedProduct) {
        if (selectedProduct.youtubers.length) {
          selectedProduct.youtubers.forEach(element => {
            // getting video key from the youtube link
            var videoid = element.link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            let videoKey = videoid[1];
            // form api link with video key
            let address = "https://www.googleapis.com/youtube/v3/videos?id=" + videoKey + "&key=" + this.favouritesService.getApiKey() + "&part=snippet,statistics";
            // getting youtube details from google youtube api
            this.favouritesService.getListVideos(address).subscribe(data => {
              console.log(data);
              this.videoDetail.push(data[0]);
            }, error => {
              this.presentToast();
            })
          });
        }
      }
      // hiding the loader and open the youtube list modal
      setTimeout(() => {
        this.hideLoader();
        if (this.videoDetail.length) {
          this.presentModal();
        }
      }, 2000)
    }, error => {
      this.presentToast();
    })
  }

  // showing loader method 
  loader: any;
  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Please wait...'
    });
    await this.loader.present();
  }

  // hiding loader
  hideLoader() {
    this.loadingController.dismiss().catch(() => { });
  }

  // method to open the youtube modal
  async presentModal() {
    try {
      const modal = await this.modalController.create({
        component: YoutubeListModalComponent,
        componentProps: {
          'videoData': this.videoDetail,
        }
      });
      return await modal.present();
    }
    catch (e) {
      console.log(e);
    }
  }

  // method to show the toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Something went wrong,Try again.',
      duration: 2000
    });
    toast.present();
  }
}
