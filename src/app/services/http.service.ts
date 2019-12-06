import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = environment.url

  constructor(private http: HttpClient) { }

  getData(queryUrl: string) {
    return this.http.get(this.url + queryUrl)
  }

  addData(queryUrl: string, body: object) {
    return this.http.post(this.url + queryUrl, body);
  }
  
  patchData(queryUrl: string, id: number, body: object) {
    return this.http.patch(this.url + queryUrl + '/' + id, body)
  }

  deleteData(queryUrl: string, id: number) {
    return this.http.delete(this.url + queryUrl + '/' + id)
  }
  /*
http://192.168.100.201:4998/nationality
http://192.168.100.201:4998/teacher/1
  */
}
