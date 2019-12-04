import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = environment.url

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(this.url + 'group')
  }

  getSpecialities(){
    return this.http.get(this.url + 'speciality')
  }

  /*
http://192.168.100.201:4998/nationality
http://192.168.100.201:4998/group
http://192.168.100.201:4998/speciality
http://192.168.100.201:4998/teacher/1


  */
}
