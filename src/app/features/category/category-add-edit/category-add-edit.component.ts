import { Component, OnInit } from '@angular/core';
import { ICategory, IParentCategory } from '../../../models/category.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-add-edit',
 // standalone: true,
  //imports: [],
  templateUrl: './category-add-edit.component.html',
  styleUrl: './category-add-edit.component.css'
})
export class CategoryAddEditComponent implements OnInit{
  id?: number; regLabel: string =""; btnLabel: string ="Register";
  category!: ICategory; claimData: any; isFilterShown: boolean = false;
  parentCategoryId:number = 0;
  parentCategoryDropDownList: IParentCategory[] = [];
  initialStatus: string = '';
    
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'; 
  AddNewCategoryForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.AddNewCategoryForm.controls;
  }
  constructor( public categoryService: CategoryService, public fb: FormBuilder, private router: Router, private acRoute: ActivatedRoute)
  {         

  }        
  ngOnInit(): void{
    this.acRoute.params.subscribe((e) => {
      this.id = +e['id'];

      this.categoryService.getCategory(this.id).subscribe((data) => {
        //console.log(data);
        if (data == undefined || data == null) {
          this.submitted =true
          this.addCategoryError = true; 
          this.errorMessage += 'No category exists for ' + this.id;
          this.successMessage = '';
        } else {
          this.category = data;
          this.setForm(this.category);
        }
      });
    });
   } 
  
  setForm(category: ICategory) {     
    this.AddNewCategoryForm = this.fb.group({
      categoryName:  [category.categoryName, [Validators.required]],
      description:  [category.description, [Validators.required]],
      //parentCategoryId: [category.parentCategoryId],
      status: ['', Validators.required]
    });
    //this.getParentCategoryList();
  }

  gridFilter: any = {
    Filter:[],
    PageNumber: 0,
    PageSize: 0
  } 

  getParentCategoryList(){    
    this.categoryService.getParentCategories()
      .subscribe({ next: (data: any) => {
          if(data.isError == false)
          {
            console.log("Parent Category Data: " + JSON.stringify(data));
            this.parentCategoryDropDownList = data.result;           
          } 
        },
        error: (err: any) => {console.log(err); }
      });
  }

  changeCategoryDropDown(e: any) {
      if(e.target.value == "") 
      { this.parentCategoryId = 0} 
      else { this.parentCategoryId =  e.target.value};     
  }

  submitted = false; addCategoryError = false; errorMessage =''; successMessage='';
  submitForm() 
  {
    this.submitted = true;
    if (this.AddNewCategoryForm?.invalid) {
      return;
    }
    //this.AddNewCategoryForm.get('parentCategoryId')!.setValue(this.parentCategoryId);
    const u = { ...this.category, ...this.AddNewCategoryForm.value };
    this.categoryService.addUpdateCategory(u).subscribe({
      next: (data) => {
        this.addCategoryError = false;
        //console.log('User added:', JSON.stringify(data));
        if(data.success == true) {
          //this.successMessage = 'Category added successfully';
          //this.submitted = true;
          this.router.navigate(['category']);
        }
      },
      error: (err) => {
        this.addCategoryError = true;
        if (err.error != null && err.error.responseException != null) {
          if (err.error.responseException.customErrors != null) {
            for (let key of err.error.responseException.customErrors) {
              this.errorMessage += key.reason + '\n';
            }
          } else {
            for (let key of err.error.responseException.validationErrors) {
              this.errorMessage += key.reason + '\n';
            }
          }
        }
      },
    });
  }
  cancel(){
      this.router.navigate(['category']); 
  }

  alphaNumberOnly (e: any) {  
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
