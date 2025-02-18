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
  menulist: any = [
    {id:1, pageURL:"/user", name:"User" },
    {id:2, pageURL:"/customer", name:"Customer" },
    {id:3, pageURL:"/category", name:"Category" },
    {id:4, pageURL:"/product", name:"Product" },
    {id:5, pageURL:"/order", name:"Order" },
  ] 
  @Input() isSubmenuOpen: boolean = false;
  constructor(public router: Router) {}
}
