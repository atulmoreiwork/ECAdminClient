import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFacilities, IOrganizations, IUserRoles, IUsers } from '../../../models/admin-users';
import Validation from '../../../shared/utilities/validation';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.css']
})
export class UsersAddEditComponent implements OnInit {
  id?: number; regLabel: string =""; btnLabel: string ="Register";
  users!: IUsers; claimData: any; isFilterShown: boolean = false;
  organizationDropDownList: IOrganizations[] = [];
  facilityDropDownList: IFacilities[] = [];
  userRolesList: IUserRoles[] = [];
  collegeId = "";  groupId = ""; roleId = "";
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'; 
  AddNewUserForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.AddNewUserForm.controls;
  }
  constructor(public fb: FormBuilder, private router: Router)
  {         

  }        
  ngOnInit(): void{ } 
  
  setForm(user: IUsers) { 
    
    this.AddNewUserForm = this.fb.group({
      organizationName:  [user.groupId, [Validators.required]],
      facilityName:  [user.collegeId, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      loginName: [user.loginName, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [user.password, [Validators.required]],
      confirmPassword : [user.password, [Validators.required]],
      userRoleName:  [user.roleId, [Validators.required]],
      roleId:  [user.roleId]
    },{validators: [Validation.match('password', 'confirmPassword')]})
    if(this.claimData.collegeId === "")  {        
      this.isFilterShown = false;
      this.groupId = user.groupId;
      this.collegeId = user.collegeId;
    } else{
      this.isFilterShown = true;
      this.groupId = this.claimData.groupId;
      this.collegeId = this.claimData.collegeId;         
    } 
    this.getUserRolesData();      
    this.roleId = this.AddNewUserForm?.value.userRoleName;
  }

  getOrganizationDropDownListData(): void 
  {
    
  }
  gridFilter: any = {
    Filter:[],
    PageNumber: 0,
    PageSize: 0
  } 
  getFacilityDropDownListData(): void 
  {

  }
  getUserRolesData(): void
  {
    
  }
  chngeOrgDropDown(e: any) {
     // console.log(e.target.value);
       if(e.target.value == "") { this.groupId = ""} else { this.groupId =  e.target.value};
      this.getFacilityDropDownListData();
  }
  
  changeFacilityDropDown(e: any) {
      //console.log(e.target.value);
      if(e.target.value == "") { this.collegeId = ""} else { this.collegeId =  e.target.value};
      this.getUserRolesData();
  }

  submitted = false; addRoleError = false; errorMessage ='';
  submitForm() 
  {
      
  }
  cancel(){
      this.router.navigate(['user/adminusers']); 
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
