import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { SpecialitiesPageComponent } from './pages/specialities-page/specialities-page.component';
import { NationalitiesPageComponent } from './pages/nationalities-page/nationalities-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupsPageComponent,
    SpecialitiesPageComponent,
    NationalitiesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
