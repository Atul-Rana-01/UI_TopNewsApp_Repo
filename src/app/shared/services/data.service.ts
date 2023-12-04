import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = '' ;
  constructor(private httpClient: HttpClient) { 
    this.baseURL = environment.apiUrl;
  }

  headers = new HttpHeaders();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })};

    get(method:any) {
      if (method.indexOf('://') > 0) {     
        return this.httpClient.get(method, this.httpOptions);
      } else
        return this.httpClient.get(this.baseURL + method, this.httpOptions);
  
    }

}
