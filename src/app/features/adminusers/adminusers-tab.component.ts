import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminusers-tab',
  template:  `<nav class="justify-start mt-3">
  <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
      <ul class="flex flex-wrap -mb-px">
          <!-- Roles Tab -->
          <li class="mr-2" id="menuRole">
              <a 
                id="CP_roles" 
                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                [routerLink]="['/user']"
                [routerLinkActive]="'text-gray-600 border-gray-300 dark:text-gray-300'"
                [routerLinkActiveOptions]="{ exact: true }">
                Roles
              </a>
          </li>
          <!-- Users Tab -->
          <li class="mr-2" id="menuUsers">
              <a 
                id="CP_users" 
                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                [routerLink]="['/user/adminusers']"
                [routerLinkActive]="'text-gray-600 border-gray-300 dark:text-gray-300'"
                [routerLinkActiveOptions]="{ exact: true }">
                Users
              </a>
          </li>
          <!-- Import Tab -->
          <li class="mr-2" id="importUser">
              <a 
                id="CP_importUsers" 
                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                [routerLink]="['/user/adminuserimports']"
                [routerLinkActive]="'text-gray-600 border-gray-300 dark:text-gray-300'"
                [routerLinkActiveOptions]="{ exact: true }">
                Import
              </a>
          </li>
      </ul>
  </div>
</nav>
`
 //styles: ['.active{border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2}']
})
export class AdminusersTabComponent {
constructor(public router: Router) {}
}
