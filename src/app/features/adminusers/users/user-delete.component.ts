import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpConfig } from '../../../shared/popup/popupconfig.model';
import { IUsers } from '../../../models/admin-users';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  //standalone: true,
  //imports: [],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent implements OnInit {
 @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() user: IUsers | undefined;
  userDeleteForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.userDeleteForm.controls;
  }
  constructor(public userService: UsersService, public fb: FormBuilder, private router: Router) {  }
  ngOnInit(): void 
  { 
    this.userDeleteForm = this.fb.group({
      userId: ['', [Validators.required]]                      
    });
  }
  
  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  submitted = false; errorMessage = ''; isUserDeleteFailed = false;


  deleteUser() 
  {
    this.userDeleteForm.patchValue({
      userId:this.user?.userId?.toString()          
    });
    this.submitted = true;
    if (this.userDeleteForm.invalid) {return; }    
    var param = {     
      UserId: this.userDeleteForm.value.userId
     }
     this.userService.deleteUserById(param).subscribe({
      next: data => {
        console.log('user Delete:', JSON.stringify(data));       
        if(data.success === true)
        {
          this.close();    
          this.ReturnMessage.next("delete");              
        }
      },
      error: err => {
        this.isUserDeleteFailed = true;
        this.errorMessage = 'Delete User Failed.';        
      }
    });
  }
}
