import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import path from 'path';
import { MenuLayoutComponent } from './shared/menu-layout/menu-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path: '',
    loadChildren: ()=> import('./core/core.module').then(m=>m.CoreModule)
  },
  {
    path:'',
    loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
  },
  { path: '**', redirectTo: 'dashboard'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
