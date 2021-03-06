import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../../services/http.service'

import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md'

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective

  private queryUrl: string = 'group'

  headElements = ['Nr', 'Grupa', 'Specialitate', 'Curs', 'Status']
  searchText: string = '';
  deleteCode: any
  deleteCodeInput: any
  specialities: any
  elements: any = [];
  previous: any = [];
  tempItem: any = {
    id: null,
    name: null,
    speciality: null,
    course: null,
    status: null
  };
  tempAddItem: any = {
    name: null,
    speciality: null,
    course: null,
    status: null
  };

  constructor(
    private httpS: HttpService,
    private cdRef: ChangeDetectorRef
  ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.getGroups()
    this.getSpecialities()
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    } if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name']); this.mdbTable.setDataSource(prev);
    }
  }

  getGroups() {
    this.httpS.getData(this.queryUrl).subscribe(data => {
      this.elements = data;
      this.refreshTable()
    })
  }

  getSpecialities() {
    this.httpS.getData('speciality').subscribe(data => {
      this.specialities = data
      this.refreshTable()
    })
  }

  patchGroup(specID) {
    console.log(specID);
    const body = {
      name: this.tempItem.name,
      speciality_id: Number(specID),
      course: Number(this.tempItem.course),
      status: this.tempItem.status
    }
    console.log(body);
    this.httpS.patchData(this.queryUrl ,this.tempItem.id, body).subscribe(data => this.elements = data)
  }

  addGroup(specID) {
    let body = {
      name: this.tempAddItem.name,
      speciality_id: Number(specID),
      course: Number(this.tempAddItem.course),
      status: this.tempAddItem.status
    }
    this.httpS.addData(this.queryUrl, body).subscribe(data => {
      this.elements = data
      this.refreshTable()
    })
  }

  deleteGroup(){
    this.httpS.deleteData(this.queryUrl, this.tempItem.id).subscribe(data => {
      console.log(data);
      this.elements = data
      this.refreshTable()
    })
  }

  refreshTable() {
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  generateDeleteCode() {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    this.deleteCode = Math.floor(Math.random() * (max - min)) + min;
  }
}