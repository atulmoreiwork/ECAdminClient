import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../models/product.model';
import { ICategory } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-edit-product',
 // standalone: true,
 // imports: [],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  id?: number; categoryId: any; categoryList: ICategory[] = [];
  product!: IProduct;
  AddNewProductForm!: FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.AddNewProductForm.controls;
  }
  constructor(public productService: ProductService, public fb: FormBuilder, private router: Router, private acRoute: ActivatedRoute, private categoryService: CategoryService)
  {         

  }
  editorContent: string = ''; 
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Formatting options
     // ['link', 'image'], // Link and image insertion
      [{ header: [1, 2, 3, false] }], // Header sizes
      [{ list: 'ordered' }, { list: 'bullet' }] // Lists
    ]
  };
  onContentChange(event: any): void {
    console.log('Content changed:', event.html);
  }
  ngOnInit(): void {
    this.acRoute.params.subscribe((e) => {
      this.id = +e['id'];
      this.productService.getProduct(this.id).subscribe((data) => {
        //console.log(data);
        if (data == undefined || data == null) {
          this.submitted =true
          this.addProductError = true; 
          this.errorMessage += 'No product exists for ' + this.id;
          this.successMessage = '';
        } else {
          this.product = data;
          this.setForm(this.product);
        }
      });
    });
  }
  setForm(product: IProduct) {   
    this.AddNewProductForm = this.fb.group({
      productName:  [product.productName, [Validators.required]],
      description:  [product.description, [Validators.required]],
      status: [product.status, Validators.required],
      categoryId:[product.categoryId, Validators.required],
      price: [product.price, Validators.required],
    });
    this.categoryId = product.categoryId == 0? "" : product.categoryId;
    this.getCategoryList();  
  }
  getCategoryList(){
    this.categoryService.getCategories().subscribe((data) => {
      if (data.success ==	true) 
      {
        this.categoryList = data.result;
      }
    });
  }

  submitted = false; addProductError = false; errorMessage =''; successMessage='';
  submitForm() {
    this.submitted = true;
    if (this.AddNewProductForm?.invalid) {
      return;
    }
  }
  cancel(){
    this.router.navigate(['product']); 
  }
  changeCategoryDropDown(evt: any){

  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  files: File[] = [];

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('Drag Over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('Drag Leave');
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      this.files.push(...droppedFiles);
      console.log('Files dropped:', this.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files);
      this.files.push(...selectedFiles);
      console.log('Files selected:', this.files);
    }
  }
    // Array to hold variants
    variants: Array<{ size: string; color: string; price: number; quantity: number }> = [];

    // Add a new blank variant
    addVariant(): void {
      this.variants.push({ size: '', color: '', price: 0, quantity: 0 });
    }
  
    // Remove a specific variant
    removeVariant(index: number): void {
      this.variants.splice(index, 1);
    }
}
