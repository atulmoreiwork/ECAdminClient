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
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { QuillModule } from 'ngx-quill';


 const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children:[
        { path: 'dashboard', component: DashboardComponent  },       
        { path: 'category', component: CategoryListComponent },
        { path: 'categoryaddedit/:id', component: CategoryAddEditComponent },
        { path: 'products', component: ProductListComponent  },
        { path: 'productaddedit/:id', component: AddEditProductComponent  },   
    ]    
  }];

@NgModule({
  declarations: [    
    CategoryAddEditComponent,
    CategoryListComponent,
    CategoryDeleteComponent,
    ProductListComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PopupModule, 
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ]
})
export class FeaturesModule { }
