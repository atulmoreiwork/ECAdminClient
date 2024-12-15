import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLayoutComponent } from '../shared/menu-layout/menu-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { PopupModule } from '../shared/popup/popup.module';
import { TableModule } from '../shared/table/table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddEditComponent } from './category/category-add-edit/category-add-edit.component';

 const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children:[
        { path: 'dashboard', component: DashboardComponent  },
        { path: 'products', component: ProductListComponent  },
        { path: 'category', component: CategoryListComponent },
        { path: 'categoryaddedit/:id', component: CategoryAddEditComponent }           
    ]    
  }];

@NgModule({
  declarations: [    
    CategoryAddEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    PopupModule, 
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ]
})
export class FeaturesModule { }
