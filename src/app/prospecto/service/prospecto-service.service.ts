import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/data/ConfigSystems/constants';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProspectoServiceService {

  constructor(
     private http: Http,
    private _url: Configuration,
    private router: Router

  ) { }

  private apiUrl = 'api/v1/prospectos'
  
  public Get(url) {
   
    return this.http.get(this.apiUrl + url).map((res) => res.json());
  }
  public Send2(data, type) {
    let typeService;
    if (type == 1) {
        typeService = RequestMethod.Post;
    } else {
        typeService = RequestMethod.Put;
    }

    return this.http.post(this.apiUrl , data)
        .map(res => res.json());
  }

  
  public Send(data, type) {
    let typeService;
    if (type == 1) {
        typeService = RequestMethod.Post;
    } else {
        typeService = RequestMethod.Put;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
   headers.append('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    let options = new RequestOptions({
        method: typeService,
        headers: headers
    });
    return this.http.post(this.apiUrl, data, options)
        .map(res => res.json());
  }

  public Post(data, url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http.post(this.apiUrl + url, data, options)
      .map(res => res.json());
  }
}
