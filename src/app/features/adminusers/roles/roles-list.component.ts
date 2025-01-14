import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CmTableComponent } from '../../../shared/table/cm-table/cm-table.component';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { FilterDetails, GridConfig, SortModel } from '../../../shared/table/table.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  @ViewChild(CmTableComponent) child?: CmTableComponent;
  @ViewChild('popup') popup?: PopupComponent;
  gridConfig: GridConfig = new GridConfig();
  constructor(private usersService: UsersService, private router: Router){
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
    pageSize: 10,
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
    this.getUsersData();
  }

  data: any;
  getUsersData(): void 
  {      
    if(this.gridConfig.isServerSidePagination == false){ this.gridFilter.Filter =  this.tableObject.filter; this.gridFilter.PageNumber= 0;  this.gridFilter.PageSize = 0;  }
    else { this.gridFilter.Filter =  this.tableObject.filter;
           this.gridFilter.PageNumber= this.tableObject.pageNumber;  
           this.gridFilter.PageSize = this.tableObject.pageSize;}
       this.data = JSON.parse('{"statusCode":200,"message":"POST Request successful.","isError":false,"result":{"pageNumber":1,"pageSize":10,"totalItems":3,"totalRecordsText":"3 Records Found","columns":[{"name":"collegeId","displayName":"College Id","isDisplayOnGrid":false,"html":false,"htmlName":"","type":"num","isSorting":true,"filter":{"isFiltering":true,"filterInputType":"input","filterType":"num","filterName":"collegeId","filterFrom":"","filterTo":""},"insertDetails":{"isDisplayOnGrid":false,"colId":null,"name":null,"value":null,"type":null}},{"name":"roleName","displayName":"Role","isDisplayOnGrid":true,"html":false,"htmlName":"","type":"cs","isSorting":true,"filter":{"isFiltering":true,"filterInputType":"input","filterType":"cs","filterName":"roleName","filterFrom":"","filterTo":""},"insertDetails":{"isDisplayOnGrid":false,"colId":null,"name":null,"value":null,"type":null}},{"name":"userCount","displayName":"#of Users","isDisplayOnGrid":true,"html":false,"htmlName":"","type":"num","isSorting":true,"filter":{"isFiltering":true,"filterInputType":"input","filterType":"num","filterName":"userCount","filterFrom":"","filterTo":""},"insertDetails":{"isDisplayOnGrid":false,"colId":null,"name":null,"value":null,"type":null}},{"name":"action","displayName":"Action","isDisplayOnGrid":true,"html":true,"htmlName":"Action","type":"cs","isSorting":false,"filter":{"isFiltering":false,"filterInputType":"input","filterType":"cs","filterName":"Action","filterFrom":"","filterTo":""},"insertDetails":{"isDisplayOnGrid":false,"colId":null,"name":null,"value":null,"type":null}}],"filter":[{"colId":"collegeId","name":"collegeId","value":"","type":"num"},{"colId":"roleName","name":"roleName","value":"","type":"cs"},{"colId":"userCount","name":"userCount","value":"","type":"num"}],"data":[{"roleId":2426,"roleName":"Approver","userCount":1,"row":"3","collegeId":"5430","totalRowCount":"3"},{"roleId":2409,"roleName":"Instructor","userCount":2,"row":"2","collegeId":"5430","totalRowCount":"3"},{"roleId":1,"roleName":"Admin","userCount":12,"row":"1","collegeId":"5430","totalRowCount":"3"}]}}');
           this.tableObject.totalItems = this.data.result.totalItems;
           this.tableObject.columns = this.data.result.columns;   
           this.tableObject.filter = this.data.result.filter;      
           this.tableObject.data = this.data.result.data;
           this.tableObject.rows = this.data.result.data;      
           this.child?.GridChanges();  
  }

  AddNewRole(){ this.router.navigate(['user/roleaddedit/0']); } 
}
