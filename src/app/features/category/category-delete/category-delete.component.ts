import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpConfig } from '../../../shared/popup/popupconfig.model';
import { ICategory } from '../../../models/category.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-delete',
  //standalone: true,
  //imports: [],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent implements OnInit{
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() category: ICategory | undefined;
  categoryDeleteForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.categoryDeleteForm.controls;
  }
  constructor(public categoryService: CategoryService, public fb: FormBuilder, private router: Router) {  }
  ngOnInit(): void 
  { 
    this.categoryDeleteForm = this.fb.group({
      categoryId: ['', [Validators.required]]                      
    });
  }
  
  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  submitted = false; errorMessage = ''; isCategoryDeleteFailed = false;


  deleteCategory() 
  {
    this.categoryDeleteForm.patchValue({
      categoryId:this.category?.categoryId?.toString()          
    });
    this.submitted = true;
    if (this.categoryDeleteForm.invalid) {return; }    
    var param = {     
      CategoryId: this.categoryDeleteForm.value.categoryId
     }
     this.categoryService.deleteCategoryById(param).subscribe({
      next: data => {
        console.log('User Delete:', JSON.stringify(data));       
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
