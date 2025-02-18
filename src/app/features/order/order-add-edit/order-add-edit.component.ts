import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem, IOrderItemsDetails, IOrderStatus, IPaymentStatus, IPaymentType } from '../../../models/order.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { IProduct, IProductVariant } from '../../../models/product.model';
import { ICategory } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-order-add-edit',
  //standalone: true,
  //imports: [],
  templateUrl: './order-add-edit.component.html',
  styleUrl: './order-add-edit.component.css'
})
export class OrderAddEditComponent implements OnInit {
  id?: number;
  customerId: any; customerList: ICustomer[] = [];
  customerData: ICustomer = {} as ICustomer;
  categoryId: any;  categoryList: ICategory[] = [];
  productId: any;  productList: IProduct[] = [];
  selectedProductVariants: IProductVariant[] = [];
  status: any; paymentType :any; paymentStatus: any;
  orderStatusList: IOrderStatus[] = [{ id: 'Placed', name: 'Placed' }, { id: 'Packed', name: 'Packed' }, { id: 'Shipped', name: 'Shipped' }, { id: 'Delivered', name: 'Delivered' }];
  paymentTypeList: IPaymentType[] = [{ id: 'NetBanking', name: 'NetBanking' }, { id: 'UPI', name: 'UPI' }, { id: 'Cash On Delivery', name: 'Cash On Delivery' }];
  paymentStatusList: IPaymentStatus[] = [{ id: 'Paid', name: 'Paid' }, { id: 'Not Paid', name: 'Not Paid' }];
  addNewOrderForm!: FormGroup;
  orderItems: any;
  order!: IOrder;
  isEditMode = false;
  submitted = false;
  OrderItemsDetails!: IOrderItemsDetails;
  responseType: 'success' | 'error' = 'success';
  ErrorResponse: any;
  constructor(private fb: FormBuilder, private orderService: OrderService, private route: ActivatedRoute, 
    private router: Router, private customerService: CustomerService, private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.initializeForm();
    //const orderId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((e) => {
      this.id = +e['id'];
      if(this.id > 0)
      {
        this.isEditMode = true;
        this.loadOrder(this.id);
      }
      else{
        this.getCustomerList();
        this.getCategoryList();
      }      
    });
  }

  initializeForm(): void {
    this.addNewOrderForm = this.fb.group({
      orderId: [0],
      orderNumber: [''],
      customerId: ['', Validators.required],
      categoryId: ['', Validators.required],
      orderShippingAddressId: [0],
      totalAmount: [0, Validators.required],
      discountAmount: [0],
      grossAmount: [0],
      shippingAmount: [0],
      netAmount: [0, Validators.required],
      status: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      paymentType: ['', Validators.required],
      paymentTransactionId: [''],
      orderItems: this.fb.array([]),
      orderShippingAddress: this.fb.group({
        orderShippingAddressId: [0],
        orderId: [0],
        fullAddress: ['', Validators.required],
        state: [''],
        city: [''],
        zipCode: [''],
        flag: [0]
      }),
      row: [''],
      totalRowCount: [''],
      flag: [0]
    });
  }  


  loadOrder(orderId: number): void {
    this.orderService.getOrder(orderId).subscribe((data) => {
      //console.log(data);
      if (data != undefined && data != null) {
        this.getCustomerList();
        this.getCategoryList(); 
        this.order = data;
        this.addNewOrderForm.patchValue(this.order);
        this.status = this.order.status;
        this.paymentType = this.order.paymentType;
        this.paymentStatus = this.order.paymentStatus;
        this.categoryId = this.order.categoryId;   
        this.customerId  = this.order.customerId;   
        this.getProductByCategoryId(this.categoryId);
        this.OrderItemsDetails = {} as IOrderItemsDetails;
        this.OrderItemsDetails.totalAmount = this.order.totalAmount.toString();
        this.OrderItemsDetails.discountAmount = this.order.discountAmount.toString();
        this.OrderItemsDetails.shippingAmount = this.order.shippingAmount.toString();
        this.OrderItemsDetails.grossAmount = this.order.grossAmount.toString();
        this.OrderItemsDetails.netAmount = this.order.totalAmount.toString();
        this.OrderItemsDetails.orderItems = this.order.orderItems;         
      }
    });
  }

  submitForm() {
    this.addNewOrderForm.patchValue({
      totalAmount:this.OrderItemsDetails?.totalAmount?.toString(),
      discountAmount:this.OrderItemsDetails?.discountAmount?.toString(),
      shippingAmount:this.OrderItemsDetails?.shippingAmount?.toString(),
      grossAmount:this.OrderItemsDetails?.grossAmount?.toString(),
      netAmount:this.OrderItemsDetails?.netAmount?.toString()     
    });
    // Get the FormArray reference
    const orderItemsFormArray = this.addNewOrderForm.get('orderItems') as FormArray;
    // Clear existing form array items before adding new ones
    orderItemsFormArray.clear();
    this.OrderItemsDetails?.orderItems?.forEach((orderItem: any) => {
      orderItemsFormArray.push(this.createOrderItemFormGroup(orderItem));
    });
    const orderData: IOrder = this.addNewOrderForm.value;
    this.submitted = true;
    this.addNewOrderForm.markAllAsTouched();
    if (this.addNewOrderForm?.invalid) {
      return;
    }
    this.orderService.addUpdateOrder(orderData).subscribe({
      next: (response: any) => {
        if (response && response.success === true) {
          console.log('Order added successfully:', response);
          this.ErrorResponse = 'Order saved successfully';
          this.responseType = 'success';
        } else {
          this.ErrorResponse = response.message || 'Unknown error occurred';
          this.responseType = 'error';
        }
      },
      error: (error: any) => {
        console.error('Error saving add/update order :', error);
        this.ErrorResponse = error.message || 'Unknown error occurred';
        this.responseType = 'error';
      },
    });
  }
  createOrderItemFormGroup(orderItem: any): FormGroup {
    return this.fb.group({
      orderItemId:[0],
      orderId:[0],
      productId: [orderItem.productId],
      productVariantId: [orderItem.productVariantId],
      productName: [orderItem.productName],
      color: [orderItem.color],
      size: [orderItem.size],     
      price: [orderItem.price],
      quantity: [orderItem.quantity],
      totalAmount: [orderItem.totalAmount]
    });
  }

  /****** Get List ****/
  changeCustomerDropDown(evt: any)
  { 
    this.customerId = evt.target.value;
    this.customerData = this.customerList.find(x => x.customerId == this.customerId) || {} as ICustomer;
  }
  getCustomerList(): void {
    this.customerService.getCustomers().subscribe((data) => {
      if (data != undefined && data != null) {
        this.customerList = data.result; 
        this.customerData = this.customerList.find(x => x.customerId == this.customerId) || {} as ICustomer;       
      }
    });
  }

  getCategoryList(): void {
    this.categoryService.getCategories().subscribe((data) => {
      if (data != undefined && data != null) {
        this.categoryList = data.result;        
      }
    });
  }
  changeCategoryDropDown(event: any){    
    this.categoryId = event.target.value;
    this.getProductByCategoryId(this.categoryId);
  }
  getProductByCategoryId(categoryId: any): void {
    var param = {     
      CategoryId: categoryId
     }
    this.productService.getProductByCategoryId(param).subscribe((data) => {
      if (data != undefined && data != null) {
        this.productList = data.result;        
      }
    });
  }
  changeOrderStatusDropDown(event: any){
    this.status = event.target.value;
  }
  changePaymentTypeDropDown(event: any){
    this.paymentType = event.target.value;
  }
  changePaymentStatusDropDown(event: any){
    this. paymentStatus = event.target.value;
  }   
  /********************/  
  getOrderItemDetails(evt: any)
  {
    this.OrderItemsDetails = evt;
  }
}
