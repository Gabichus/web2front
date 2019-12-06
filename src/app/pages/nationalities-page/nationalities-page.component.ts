import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-nationalities-page',
  templateUrl: './nationalities-page.component.html',
  styleUrls: ['./nationalities-page.component.scss']
})
export class NationalitiesPageComponent implements OnInit {

  private queryUrl = 'nationality'
  
  headElements = ['Nr' ,'Nationalitatea'];
  elements: any = [];
  deleteCode: any
  deleteCodeInput: any
  tempItem: any = {
    id: null,
    name: null,
  };
  tempAddItem: any = {
    name: null,
  }

  constructor(private httpS: HttpService) { }

  ngOnInit() {
    this.getNationalities()
  }

  // #region CRUD

  getNationalities(){
    this.httpS.getData(this.queryUrl).subscribe(data => this.elements = data)
  }

  addNationality(){
    this.httpS.addData(this.queryUrl, this.tempAddItem).subscribe(data => this.elements = data)
  }

  patchNationality() {
    this.httpS.patchData(this.queryUrl, this.tempItem.id, {name: this.tempItem.name}).subscribe(data => this.elements = data)
  }

  deleteNationality() {
    this.httpS.deleteData(this.queryUrl, this.tempItem.id).subscribe(data => this.elements = data)
  }
  
  // #endregion

  generateDeleteCode() {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    this.deleteCode = Math.floor(Math.random() * (max - min)) + min;
  }
}
