import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';





const routes: Routes = [
 
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HomeComponent},


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class prospectoRoutingModule { }