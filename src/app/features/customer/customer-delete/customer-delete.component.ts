import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpConfig } from '../../../shared/popup/popupconfig.model';
import { ICustomer } from '../../../models/customer.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-delete',
 // standalone: true,
  //imports: [],
  templateUrl: './customer-delete.component.html',
  styleUrl: './customer-delete.component.css'
})
export class CustomerDeleteComponent implements OnInit {
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() customer: ICustomer | undefined;
  customerDeleteForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.customerDeleteForm.controls;
  }
  constructor(public customerService: CustomerService, public fb: FormBuilder, private router: Router) {  }
  ngOnInit(): void 
  { 
    this.customerDeleteForm = this.fb.group({
      customerId: ['', [Validators.required]]                      
    });
  }
  
  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  submitted = false; errorMessage = ''; isCustomerDeleteFailed = false;


  deleteCustomer() 
  {
    this.customerDeleteForm.patchValue({
      customerId:this.customer?.customerId?.toString()          
    });
    this.submitted = true;
    if (this.customerDeleteForm.invalid) {return; }    
    var param = {     
      CustomerId: this.customerDeleteForm.value.customerId
     }
     this.customerService.deleteCustomerById(param).subscribe({
      next: data => {
        console.log('Customer Delete:', JSON.stringify(data));       
        if(data.success === true)
        {
          this.close();    
          this.ReturnMessage.next("delete");              
        }
      },
      error: err => {
        this.isCustomerDeleteFailed = true;
        this.errorMessage = 'Delete User Failed.';        
      }
    });
  }
}
