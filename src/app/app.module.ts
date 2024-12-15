import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MenuLayoutComponent } from './shared/menu-layout/menu-layout.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    MenuLayoutComponent,
    SidebarComponent,    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
