import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-menu-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './menu-layout.component.html',
  styleUrl: './menu-layout.component.css'
})
export class MenuLayoutComponent {
  isSubmenuOpen: boolean = false;

  constructor(private router: Router){ }

  logout(): void {
    this.router.navigate(['login']);  
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
}
