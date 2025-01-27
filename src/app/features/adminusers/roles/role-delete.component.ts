import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpConfig } from '../../../shared/popup/popupconfig.model';
import { IRole } from '../../../models/admin-users';

@Component({
  selector: 'app-role-delete',
  //standalone: true,
  //imports: [],
  templateUrl: './role-delete.component.html',
  styleUrl: './role-delete.component.css'
})
export class RoleDeleteComponent implements OnInit{
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() role: IRole | undefined;
  roleDeleteForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.roleDeleteForm.controls;
  }
  constructor(public roleService: RoleService, public fb: FormBuilder, private router: Router) {  }
  ngOnInit(): void 
  { 
    this.roleDeleteForm = this.fb.group({
      roleId: ['', [Validators.required]]                      
    });
  }
  
  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  submitted = false; errorMessage = ''; isRoleDeleteFailed = false;


  deleteRole() 
  {
    this.roleDeleteForm.patchValue({
      roleId:this.role?.roleId?.toString()          
    });
    this.submitted = true;
    if (this.roleDeleteForm.invalid) {return; }    
    var param = {     
      RoleId: this.roleDeleteForm.value.roleId
     }
     this.roleService.deleteRoleById(param).subscribe({
      next: data => {
        console.log('role Delete:', JSON.stringify(data));       
        if(data.success === true)
        {
          this.close();    
          this.ReturnMessage.next("delete");              
        }
      },
      error: err => {
        this.isRoleDeleteFailed = true;
        this.errorMessage = 'Delete User Failed.';        
      }
    });
  }
}
