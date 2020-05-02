import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  @Input() categories: any[];

  constructor(navParams: NavParams, private modalCtrl: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('categories'));
  }

  ngOnInit() {

  }

  send() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss(this.categories).then(() => { this.modalCtrl = null; });
    }
  }
}
