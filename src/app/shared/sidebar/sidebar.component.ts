import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
 imports: [CommonModule,RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menulist: any = [{id:1, pageURL:"/category", name:"Category" },{id:2, pageURL:"/products", name:"Product" }] 
  @Input() isSubmenuOpen: boolean = false;
  constructor(public router: Router) {}
}
