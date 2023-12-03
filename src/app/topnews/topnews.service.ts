import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service'
import { TopNewsModel } from '../models/TopNewsModel';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopnewsService {
  urlTopNewsList = ''
  constructor(private dataService: DataService) { }


  GetTopNewsList(): Observable<TopNewsModel[]> {
    debugger
    return this.dataService.get(this.urlTopNewsList).pipe(map((data: any) => {
      return data;
    }));

  }
}
