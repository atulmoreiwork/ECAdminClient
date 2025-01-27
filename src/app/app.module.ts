import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MenuLayoutComponent } from './shared/menu-layout/menu-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { LoadersInterceptor } from './shared/loader/loaders.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';


@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MenuLayoutComponent,
    SidebarComponent,  
    HttpClientModule,
    QuillModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
