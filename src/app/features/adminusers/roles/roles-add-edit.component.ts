import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrganizations, IFacilities,  IUserRoles, IUsers, permission } from '../../../models/admin-users';

@Component({
  selector: 'app-roles-add-edit',
  templateUrl: './roles-add-edit.component.html',
  styleUrls: ['./roles-add-edit.component.css']
})
export class RolesAddEditComponent implements OnInit {

  id?: number; regLabel: string =""; btnLabel: string ="Register";
  userroles!: IUserRoles; claimData: any; isFilterShown: boolean = false;
  organizationDropDownList: IOrganizations[] = [];
  facilityDropDownList: IFacilities[] = [];
  collegeId = ""; groupId = ""; roleId? = 0;
  PermissionData: permission[] = [];
  submitted = false; addRoleError = false;errorMessage ='';
  addeditRoleForm! : FormGroup;
  get f(): { [key: string]: AbstractControl } {return this.addeditRoleForm.controls; }
  constructor(public fb: FormBuilder, private router: Router)
  {         

  }        
  ngOnInit(): void{ } 
  chngeOrgDropDown(e: any) {
    // console.log(e.target.value);
      if(e.target.value == "") { this.groupId = ""} else { this.groupId =  e.target.value};
     //this.getFacilityDropDownListData();
 }
 
 changeFacilityDropDown(e: any) {
     //console.log(e.target.value);
     if(e.target.value == "") { this.collegeId = ""} else { this.collegeId =  e.target.value};
    // this.getUserRolesData();
 }
  submitForm(){

  }
  cancel(){
    this.router.navigate(['user']); 
  }
  alphaNumberOnly (e: any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    } 
    e.preventDefault();
    return false;
  }  
  onPaste(e: any) {
    e.preventDefault();
    return false;
  }
}
