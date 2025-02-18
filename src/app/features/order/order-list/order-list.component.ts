import { Component, OnInit, ViewChild } from '@angular/core';
import { CmTableComponent } from '../../../shared/table/cm-table/cm-table.component';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { FilterDetails, GridConfig, SortModel } from '../../../shared/table/table.model';
import { IOrder } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { PopUpConfig, PopUpConfigFactory } from '../../../shared/popup/popupconfig.model';

@Component({
  selector: 'app-order-list',
  //standalone: true,
  //imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{
 @ViewChild(CmTableComponent) child?: CmTableComponent;
  @ViewChild('popup') popup?: PopupComponent;
  gridConfig: GridConfig = new GridConfig();
  order!:IOrder;
  constructor(private orderService: OrderService, private router: Router){
   this.tableObject.gridConfig = this.gridConfig;    
  }
  ngOnInit(): void 
  { 
    this.fillFilterObject();
  }
  sortObj: SortModel={
    orderBy: -1,
    columnName:'row',
    sortType: 'num',
    condition: null
  }
  tableObject: any = {
    columns:[],
    data:[],
    rows:[],
    filter:[],
    gridConfig: {},
    totalItems: 0,
    paging: [],
    totalPages: 0,
    pageAccessList: [],
    totalRecordsText:'',
    pageNumber: 1,
    pageSize: 5,
  }
 
  gridFilter: any = {
    Filter:this.tableObject.filter,
    PageNumber: 0,
    PageSize: 0
  }
  
  pageChangeEvent($eve: any){
    this.fillFilterObject();
  }
  pageSizeChangeEvent($eve: any){
    this.fillFilterObject();
  }

  fillFilterObject(){
    let index = this.tableObject.filter.findIndex(((obj: { colId: string; }) => obj.colId.toLowerCase() == "userid"));
    if(index > -1){ this.tableObject.filter[index].value = 1;  }
    if(this.tableObject.filter.length <=0){
      var objFilter = new FilterDetails();  
      objFilter.colId="userid"; objFilter.name="userid"; objFilter.value= "";  objFilter.type= "num";
      this.tableObject.filter.push(objFilter);
    }
    this.getOrderData();
  }

  getOrderData(): void 
  {      
    //debugger;
    if(this.gridConfig.isServerSidePagination == false){ this.gridFilter.Filter =  this.tableObject.filter; this.gridFilter.PageNumber= 0;  this.gridFilter.PageSize = 0;  }
    else { this.gridFilter.Filter =  this.tableObject.filter;
           this.gridFilter.PageNumber= this.tableObject.pageNumber;  
           this.gridFilter.PageSize = this.tableObject.pageSize;}

    this.orderService.getAllOrders(this.gridFilter)
      .subscribe({ next: (data: any) => {
          if(data.success == true)
          {
           // console.log("category Data: " + JSON.stringify(data));
           this.tableObject.totalItems = data.result.totalItems;
           this.tableObject.columns = data.result.columns;   
           this.tableObject.filter = data.result.filter;      
           this.tableObject.data = data.result.data;
           this.tableObject.rows = data.result.data;      
           this.child?.GridChanges();            
          } 
        },
        error: (err: any) => {console.log(err); }
      });
  }

  AddNewOrder(){ this.router.navigate(['order/orderaddedit/0']); } 

  popupConfig: PopUpConfig = PopUpConfigFactory.getPopUpConfig({
    header: 'Delete Order'
  });

  orderDelete(obj: any) {
    this.popupConfig.isShowPopup = true;
    this.popupConfig.header = 'Confirm';
    this.popupConfig.isShowHeaderText = true;
    this.popupConfig.isConfirmBox = true;
    this.popupConfig.popupFor = 'small';
    this.popup?.open(this.popupConfig);
    this.order = obj;
  }
  close($event: boolean) 
  { 
    this.popupConfig.isShowPopup = false;
  }
  getReturnMessage(message: any) {
    if(message == "delete"){
      this.popupConfig.isShowPopup = false;
      this.fillFilterObject();
    }
  }
}
