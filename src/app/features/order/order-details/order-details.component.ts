import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../models/order.model';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  //standalone: true,
  //imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit 
{
  id?: number;  
  order!: IOrder;
  addNewOrderForm!: FormGroup;
  submitted = false;
  ErrorResponse: any;
  responseType: 'success' | 'error' = 'success';
  get f(): { [key: string]: AbstractControl } {
    return this.addNewOrderForm.controls;
  }
  constructor(public orderService: OrderService, public fb: FormBuilder, private router: Router, private acRoute: ActivatedRoute)
  {         

  }
  ngOnInit(): void {
    this.acRoute.params.subscribe((e) => {
      this.id = +e['id'];
      this.orderService.getOrder(this.id).subscribe((data) => {
        //console.log(data);
        if (data == undefined || data == null) {
          this.submitted =true
          this.ErrorResponse = 'No order exists for ' + this.id;
          this.responseType = 'error';
        } else {
          this.order = data;
          //this.setForm(this.product);
        }
      });
    });
  }
}
