import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  elements: any = [];
  specialities: any = []
  tempItem: any = {
    id: null,
    name: null,
    speciality: null,
    course: null,
    status: null
  };
  headElements = ['Nume', 'Specialitatea', 'Curs', 'Status'];

  constructor(private httpS: HttpService) { }

  ngOnInit() {
    this.getGroups()
    this.getSpecialities()
  }

  getGroups(){
    this.httpS.getGroups().subscribe(data => {
      this.elements = data;
    })
  }

  getSpecialities(){
    this.httpS.getSpecialities().subscribe(data => {
      this.specialities = data
    })
  }
}
