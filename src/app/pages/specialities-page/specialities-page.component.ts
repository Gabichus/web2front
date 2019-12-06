import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-specialities-page',
  templateUrl: './specialities-page.component.html',
  styleUrls: ['./specialities-page.component.scss']
})
export class SpecialitiesPageComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective

  private queryUrl: string = 'speciality'

  headElements = ['Nr', 'Specialitatea', 'Durata', 'Nr. Credite', 'Denumirea la engleza'];
  searchText: string = '';
  elements: any = [];
  previous: any = [];
  deleteCode: any
  deleteCodeInput: any
  tempItem: any = {
    id: null,
    name: null,
    nrYears: null,
    nrCredits: null,
    english: null
  };
  tempAddItem: any = {
    name: null,
    nrYears: null,
    nrCredits: null,
    english: null
  }

  constructor(
    private httpS: HttpService,
    private cdRef: ChangeDetectorRef
  ) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
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

  //#region CRUD
  getSpecialities() {
    this.httpS.getData(this.queryUrl).subscribe(data => {
      this.elements = data;
      this.refreshTable();
    })
  }

  addSpeciality() {
    this.httpS.addData(this.queryUrl, this.tempAddItem).subscribe(data => {
      this.elements = data
      this.refreshTable()
      this.refreshTempAddItem();
    })
  }

  patchSpeciality() {
    const body = {
      name: this.tempItem.name,
      nrYears: this.tempItem.nrYears,
      nrCredits: this.tempItem.nrCredits,
      english: this.tempItem.english
    }
    this.httpS.patchData(this.queryUrl, this.tempItem.id, body).subscribe(data => this.elements = data)
  }

  deleteSpeciality() {
    this.httpS.deleteData(this.queryUrl, this.tempItem.id).subscribe(data => {
      this.elements = data;
      this.refreshTable()
    })
  }
  //#endregion

  refreshTempAddItem() {
    this.tempItem = {
      name: null,
      nrYears: null,
      nrCredits: null,
      english: null
    };
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
