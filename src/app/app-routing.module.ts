import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';


const routes: Routes = [
  { path: 'groups', component: GroupsPageComponent },
  { path: '**', redirectTo: '',  component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }