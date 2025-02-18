import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpConfig } from '../../../shared/popup/popupconfig.model';
import { IProduct } from '../../../models/product.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  //standalone: true,
  //imports: [],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent implements OnInit{
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() product: IProduct | undefined;
  productDeleteForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.productDeleteForm.controls;
  }
  constructor(public productService: ProductService, public fb: FormBuilder, private router: Router) {  }
  ngOnInit(): void 
  { 
    this.productDeleteForm = this.fb.group({
      productId: ['', [Validators.required]]                      
    });
  }
  
  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  submitted = false; errorMessage = ''; isCategoryDeleteFailed = false;


  deleteProduct() 
  {
    this.productDeleteForm.patchValue({
      productId:this.product?.productId?.toString()          
    });
    this.submitted = true;
    if (this.productDeleteForm.invalid) {return; }    
    var param = {     
      ProductId: this.productDeleteForm.value.productId
     }
     this.productService.deleteProductById(param).subscribe({
      next: data => {
        console.log('Product Delete:', JSON.stringify(data));       
        if(data.success === true)
        {
          this.close();    
          this.ReturnMessage.next("delete");              
        }
      },
      error: err => {
        this.isCategoryDeleteFailed = true;
        this.errorMessage = 'Delete User Failed.';        
      }
    });
  }
}
