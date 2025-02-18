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
import { SvgComponent } from '../shared/svg/svg.component';
import { DragDropImagesComponent } from '../shared/drag-drop-images/drag-drop-images.component';
import { ExcludeDeletedPipe } from '../shared/pipe/exclude-deleted.pipe';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer/customer-add-edit/customer-add-edit.component';
import { CustomerDeleteComponent } from './customer/customer-delete/customer-delete.component';
import { RolesListComponent } from './adminusers/roles/roles-list.component';
import { RolesAddEditComponent } from './adminusers/roles/roles-add-edit.component';
import { UsersListComponent } from './adminusers/users/users-list.component';
import { UsersAddEditComponent } from './adminusers/users/users-add-edit.component';
import { UsersImportsComponent } from './adminusers/imports/users-imports.component';
import { AdminusersTabComponent } from './adminusers/adminusers-tab.component';
import { RoleDeleteComponent } from './adminusers/roles/role-delete.component';
import { UserDeleteComponent } from './adminusers/users/user-delete.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { OrderAddEditComponent } from './order/order-add-edit/order-add-edit.component';
import { OrderItemsComponent } from './order/order-items/order-items.component';


 const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children:[
        { path: 'dashboard', component: DashboardComponent  },       
        { path: 'category', component: CategoryListComponent },
        { path: 'category/categoryaddedit/:id', component: CategoryAddEditComponent },
        { path: 'product', component: ProductListComponent  },
        { path: 'product/productaddedit/:id', component: AddEditProductComponent  },   
        { path: 'order', component: OrderListComponent  },
        { path: 'order/orderdetails/:id', component: OrderDetailsComponent  },   
        { path: 'order/orderaddedit/:id', component: OrderAddEditComponent  },
        { path: 'customer', component: CustomerListComponent  },
        { path: 'customer/customeraddedit/:id', component: CustomerAddEditComponent  },  
        { path: 'user', component: RolesListComponent },
        { path: 'user/roles/:id', component: RolesAddEditComponent },
        { path: 'user/adminusers', component: UsersListComponent },
        { path: 'user/useraddedit/:id', component: UsersAddEditComponent },
        { path: 'user/adminuserimports', component: UsersImportsComponent }  
    ]    
  }];

@NgModule({
  declarations: [    
    CategoryAddEditComponent,
    CategoryListComponent,
    CategoryDeleteComponent,
    ProductListComponent,
    AddEditProductComponent,
    SvgComponent,
    DragDropImagesComponent,
    ExcludeDeletedPipe,
    OrderListComponent,
    OrderDetailsComponent,
    CustomerListComponent,
    CustomerAddEditComponent,
    CustomerDeleteComponent,
    AdminusersTabComponent,
    RolesListComponent,
    RolesAddEditComponent,
    UsersListComponent,
    UsersAddEditComponent,
    UsersImportsComponent,
    RoleDeleteComponent,
    UserDeleteComponent,
    ProductDeleteComponent,
    OrderAddEditComponent,
    OrderItemsComponent
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
