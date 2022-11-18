import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatComponent } from './components/pages/creat/creat.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ViewComponent } from './components/pages/view/view.component';

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo:'home'},
  {path: 'home', component:  HomeComponent},
  { path: 'home/create', component: CreatComponent },
  { path: 'home/:accId/view', component: ViewComponent },
  { path: 'home/:accId/edit', component: EditComponent } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
