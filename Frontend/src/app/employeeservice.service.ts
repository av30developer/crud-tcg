import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private https: HttpClient) { 
  }

  postApi(url:any, data:any): Observable<any> {

    return this.https.post(environment.baseurl + url, data);

  }
  getApi(url:any) {
    
    return this.https.get(environment.baseurl+url);
  }

  deleteApi(url:any,id:any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        id: id
      },
    };
    return this.https.delete(environment.baseurl+url,options);
  }

  putApi(url:any,data:any,id) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        id: id
      },
    };
    return this.https.put(environment.baseurl+url,data,options);
  }
}
