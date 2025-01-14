import { ICustomer } from "./customer.model";

export interface IOrder 
{
    orderId: number;
    orderNumber: string;
    customerId:number;
    orderShippingAddressId: number;
    customerName:string;    
    totalAmount: string;     
    discountAmount: string;  
    grossAmount:string;
    shippingAmount:string;
    netAmount:string;
    status:string;
    paymentStatus:string;
    paymentType:string;
    paymentTransactionId: string;
    customer: ICustomer;
    orderShippingAddress: IOrderShippingAddress; 
    orderItems: IOrderItem[];
    row: string;
    totalRowCount: string;
    flag: number;
}

export interface IOrderShippingAddress
{
    orderShippingAddressId: number;
    orderId: number;
    fullAddress: string;
    state:string;
    city:string;
    zipCode: string;
    flag:number;
}

export interface IOrderItem
{
    orderItemId: number;
    orderId: number;
    productId:number;
    productVariantId: number;
    productName: string;
    color: string;
    size:string;
    price:string;
    quantity: string;
    totalAmount: string;   
}