import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteServiceConst = {
    getWidgetsList: '/assets/sample-json/gadgets-list.json',
    getGadgetDetail: '/assets/sample-json/youtube-links.json'
  }
  constructor(private httpClient: HttpClient) { }

  getFavourites(): Observable<any> {
    return this.httpClient.get(this.favouriteServiceConst.getWidgetsList).pipe(map(data => <any>data));
  }
  getApiKey() {
    return environment.apiKey;
  }
  getGadgetDetail(id: any): Observable<any> {
    return this.httpClient.get(this.favouriteServiceConst.getGadgetDetail).pipe(map(data => <any>data));
  }
  getListVideos(address) {
    return this.httpClient.get(address)
      .pipe(map((res) => {
        return res['items'];
      }))
  }
}
