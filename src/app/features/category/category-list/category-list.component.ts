import { Component, OnInit, ViewChild } from '@angular/core';
import { CmTableComponent } from '../../../shared/table/cm-table/cm-table.component';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { FilterDetails, GridConfig, SortModel } from '../../../shared/table/table.model';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { PopUpConfig, PopUpConfigFactory } from '../../../shared/popup/popupconfig.model';
import { ICategory } from '../../../models/category.model';

@Component({
  selector: 'app-category-list',
  //standalone: true,
  //imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  @ViewChild(CmTableComponent) child?: CmTableComponent;
  @ViewChild('popup') popup?: PopupComponent;
  gridConfig: GridConfig = new GridConfig();
  category!:ICategory;
  constructor(private categoryService: CategoryService, private router: Router){
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
    //console.log("pageChangeEvent:" + $eve);
    //console.log("filterObject: " + JSON.stringify(this.tableObject.filter));
    this.fillFilterObject();
  }
  pageSizeChangeEvent($eve: any){
    //console.log("pageSizeChangeEvent:" + $eve);
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
    this.getCategoryData();
  }

  getCategoryData(): void 
  {      
    //debugger;
    if(this.gridConfig.isServerSidePagination == false){ this.gridFilter.Filter =  this.tableObject.filter; this.gridFilter.PageNumber= 0;  this.gridFilter.PageSize = 0;  }
    else { this.gridFilter.Filter =  this.tableObject.filter;
           this.gridFilter.PageNumber= this.tableObject.pageNumber;  
           this.gridFilter.PageSize = this.tableObject.pageSize;}

    this.categoryService.getAllCategory(this.gridFilter)
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

  AddNewCategory(){ this.router.navigate(['category/categoryaddedit/0']); } 

  popupConfig: PopUpConfig = PopUpConfigFactory.getPopUpConfig({
    header: 'Delete User'
  });

  categoryDelete(obj: any) {
    this.popupConfig.isShowPopup = true;
    this.popupConfig.header = 'Confirm';
    this.popupConfig.isShowHeaderText = true;
    this.popupConfig.isConfirmBox = true;
    this.popupConfig.popupFor = 'small';
    this.popup?.open(this.popupConfig);
    this.category = obj;
  }
  close($event: boolean) 
  { 
    this.popupConfig.isShowPopup = false;
  }
  getReturnMessage(message: any) {
    debugger;
    if(message == "delete"){
      this.popupConfig.isShowPopup = false;
      this.fillFilterObject();
    }
  }
}
