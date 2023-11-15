import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActionComponent } from './components/action/action.component';
import { Action2Component } from './components/action2/action2.component';
import { Action3Component } from './components/action3/action3.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'action', component: ActionComponent },
  {
    path: 'action2',
    component: Action2Component
  },
  {
    path: 'action2/:id',
    component: Action3Component
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
