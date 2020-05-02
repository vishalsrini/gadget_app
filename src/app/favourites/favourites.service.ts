import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteServiceConst = {
    getWidgetsList: '/assets/sample-json/gadgets-list.json'
  }
  constructor(private httpClient: HttpClient) { }

  getFavourites(): Observable<any> {
    return this.httpClient.get(this.favouriteServiceConst.getWidgetsList).pipe(map(data => <any>data));
  }
}
