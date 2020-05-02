import { FilterModalComponent } from './../common/filter-modal/filter-modal.component';
import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { YoutubeListModalComponent } from '../common/youtube-list-modal/youtube-list-modal.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  gadgetList: any = [];
  customGadgetList: any = [];
  searchText: any;
  videoDetail = [];
  categories: any = [];
  constructor(private homeService: HomeService, public modalController: ModalController,
    public loadingController: LoadingController, public toastController: ToastController) {
  }

  ngOnInit() {
    this.getGadgets();
  }

  ionViewDidEnter() {
    this.getGadgets();
    this.resetItems();
  }

  getCategories() {
    return _.uniqBy(this.gadgetList, 'category')
  }

  // reseting the filters 
  resetItems() {
    this.searchText = '';
  }

  getGadgets() {
    this.categories=[];
    // getting gadgets master list from service
    this.homeService.getGadgets().subscribe(success => {
      console.log(success);
      if (success) {
        this.gadgetList = success.gadgetsList;
        this.customGadgetList = this.gadgetList;
        let categorylist = this.getCategories();
        console.log(categorylist);
        categorylist.length ? categorylist.every(ele => this.categories.push({ name: ele.category, isChecked: true })) : [];
      }
    }, error => {
    })
  }

  // Searching the product
  search(event) {
    console.log(event);
    this.customGadgetList = this.gadgetList.filter(ele => ele.productName.toLowerCase().includes(event));
  }

  filter(){
    let selectedCategory=[];
    this.categories.forEach(ele=> ele.isChecked ? selectedCategory.push(ele.name):'');
    console.log(selectedCategory)
    this.customGadgetList=selectedCategory.length ? this.gadgetList.filter(ele=> selectedCategory.includes(ele.category)):this.gadgetList;
  }

  // favourites selection
  clickFavourites(gadget) {
    gadget.isFavourite = !gadget.isFavourite;
  }

  // fetching video details for selected product
  viewDetail(productId) {
    this.videoDetail = [];
    console.log(productId)
    this.showLoader();
    let selectedProduct;
    this.homeService.getGadgetDetail(productId).subscribe(success => {
      // remove this once integrated with api
      selectedProduct = success.gadgetDetail.find(ele => ele.productId == productId);
      if (selectedProduct) {
        if (selectedProduct.youtubers.length) {
          selectedProduct.youtubers.forEach(element => {
            // getting video key from the youtube link
            var videoid = element.link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            let videoKey = videoid[1];
            // form api link with video key
            let address = "https://www.googleapis.com/youtube/v3/videos?id=" + videoKey + "&key=" + this.homeService.getApiKey() + "&part=snippet,statistics";
            // getting youtube details from google youtube api
            this.homeService.getListVideos(address).subscribe(data => {
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
          this.presentModal(selectedProduct.productName);
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
  async presentModal(productName) {
    try {
      const modal = await this.modalController.create({
        component: YoutubeListModalComponent,
        componentProps: {
          'productName':productName,
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

  async openBottomfilterSheet() {
    const presentModel = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        'categories': this.categories
      },
      backdropDismiss:false,
      showBackdrop: true,
      cssClass: 'filter-modal'
    });
    presentModel.onWillDismiss().then((data) => {
      console.log(data);
      this.categories=data.data;
      this.filter();
      
    });
    return await presentModel.present();
  }

}
