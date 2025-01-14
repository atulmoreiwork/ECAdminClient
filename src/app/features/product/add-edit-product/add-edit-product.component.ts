import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, IProductVariant } from '../../../models/product.model';
import { ICategory } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { DocumentService } from '../../../services/document.service';
import { IDocument } from '../../../models/document.model';

@Component({
  selector: 'app-add-edit-product',
 // standalone: true,
 // imports: [],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  headerName: string = "Add/Edit Product"; buttonName: string = "Save"
  id?: number; categoryId: any; categoryList: ICategory[] = [];
  
  product!: IProduct;
  documents: IDocument[] = [];
  addNewProductForm!: FormGroup;
  submitted = false;
  ErrorResponse: any;
  responseType: 'success' | 'error' = 'success';
  get f(): { [key: string]: AbstractControl } {
    return this.addNewProductForm.controls;
  }
  constructor(public productService: ProductService, public fb: FormBuilder, private router: Router, private acRoute: ActivatedRoute, private categoryService: CategoryService, public documentService: DocumentService)
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
    //console.log('Content changed:', event.html);
    this.editorContent = event.html;
  }
  ngOnInit(): void {
    this.acRoute.params.subscribe((e) => {
      this.id = +e['id'];
      if(this.id > 0){this.headerName = "Edit Product"; this.buttonName = "Update";}
      else {this.headerName = "Add Product";  this.buttonName = "Save";}
      this.productService.getProduct(this.id).subscribe((data) => {
        //console.log(data);
        if (data == undefined || data == null) {
          this.submitted =true
          this.ErrorResponse = 'No product exists for ' + this.id;
          this.responseType = 'error';
        } else {
          this.product = data;
          this.setForm(this.product);
        }
      });
    });
  }
  setForm(product: IProduct) {   
    this.addNewProductForm = this.fb.group({
      productId:  [product.productId],
      productName:  [product.productName, [Validators.required]],
      description:  [product.description],
      status: [product.status, Validators.required],
      categoryId:[product.categoryId, Validators.required],
      price: [product.price, Validators.required],
      importedFile: [''] 
    });
    this.variants = product.productVariants;
    this.categoryId = product.categoryId == 0? "" : product.categoryId;
    this.editorContent = product.description;
    this.getCategoryList();  
    this.documents = [];
    if(product.productId > 0){      
      this.getDocuments(product.productId);
    }    
  }
  getCategoryList(){
    this.categoryService.getCategories().subscribe((data) => {
      if (data.success ==	true) 
      {
        this.categoryList = data.result;
      }
    });
  }

  submitForm() {
    this.submitted = true;
    //this.addNewProductForm.patchValue({ importedFile: this.files.map(file => file.name) })
    this.addNewProductForm.patchValue({description: this.editorContent });
    this.addNewProductForm.markAllAsTouched();
    if (this.addNewProductForm?.invalid) {
      return;
    }
  
    var formData: any = new FormData();
    formData.append('ProductId', this.addNewProductForm.get('productId')?.value);
    formData.append('ProductName', this.addNewProductForm.get('productName')?.value);
    formData.append('Description', this.addNewProductForm.get('description')?.value);
    formData.append('CategoryId', this.addNewProductForm.get('categoryId')?.value);
    formData.append('Price', this.addNewProductForm.get('price')?.value);
    formData.append('Status', this.addNewProductForm.get('status')?.value);    
    //formData.append('ImportFile', this.addNewProductForm.value.importedFile);
    this.uploadedImages.forEach((image) => {
      formData.append('ImportFile', image); // Append each file
    });
    formData.append('ProductVariants', JSON.stringify(this.variants));
    formData.append('Documents', JSON.stringify(this.documents));
    console.log('FormData Contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    this.productService.addUpdateProduct(formData).subscribe({
      next: (response: any) => {
        if (response && response.success === true) {
          console.log('product added successfully:', response);
          this.ErrorResponse = 'Product saved successfully';
          this.responseType = 'success';
        } else {
          this.ErrorResponse = response.message || 'Unknown error occurred';
          this.responseType = 'error';
        }
      },
      error: (error: any) => {
        console.error('Error saving brand kit:', error);
        this.ErrorResponse = error.message || 'Unknown error occurred';
        this.responseType = 'error';
      },
    });
  }
  cancel(){
    this.router.navigate(['product']); 
  }
  changeCategoryDropDown(evt: any){

  }

  uploadedImages: string[] = []; // Holds the list of image URLs from the child component

  onImageListChange(imageList: string[]): void {
    this.uploadedImages = imageList; // Update the parent component's list
    console.log('Updated Image List:', this.uploadedImages);
  }
  // Array to hold variants
  variants: IProductVariant[] = [];

  // Add a new blank variant
  addVariant(): void {
    this.variants.push({productVariantId: 0,productId: 0, size: '', color: '', price: 0, stockQuantity: 0 });
  }
  
  // Remove a specific variant
  removeVariant(index: number): void {
    this.variants.splice(index, 1);
  }

  getDocuments(ProductId: any) 
  {
    var param =  { AssociatedId: ProductId,  AssociatedType: "Product" }
    this.documentService.getDocuments(param).subscribe({
      next: data => {
        //console.log('Documents:', JSON.stringify(data));       
        if(data.success === true)
        {
          this.documents =  data.result;     
        }
      },
      error: err => {           
      }
    });
  }
  removeDocument(document: any ): void {
    const index = this.documents.findIndex(doc => doc.documentId === document.documentId);
    if (index !== -1) {
      this.documents[index].isDeleted = true;
      this.documents = [...this.documents];
    }
  }
}
