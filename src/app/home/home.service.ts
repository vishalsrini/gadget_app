import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeServiceConst = {
    getGadgetsList: '/assets/sample-json/gadgets-list.json',
    getGadgetDetail: '/assets/sample-json/youtube-links.json'
  }
  constructor(private httpClient: HttpClient) { }

  getGadgets(): Observable<any> {
    return this.httpClient.get(this.homeServiceConst.getGadgetsList).pipe(map(data => <any>data));
  }

  getGadgetDetail(id: any): Observable<any> {
    return this.httpClient.get(this.homeServiceConst.getGadgetDetail).pipe(map(data => <any>data));
  }

  getApiKey() {
    return environment.apiKey;
  }
  
  getListVideos(address) {
    return this.httpClient.get(address)
      .pipe(map((res) => {
        return res['items'];
      }))
  }
}
