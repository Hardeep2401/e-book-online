import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss'],
})
export class UploadProductComponent {
  valueValid: boolean = false;
  valueInvalid: boolean = false; 
  ImageName: string = '';
  submitted = false;
  bookData: any = [];
  constructor(private productUpload: ProductService) {}
  uploadProduct: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    binding: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  // upload product validation
  get authorName() {
    return this.uploadProduct.get('name');
  }
  get productAuthor() {
    return this.uploadProduct.get('author');
  }
  get productBinding() {
    return this.uploadProduct.get('binding');
  }
  get productLanguage() {
    return this.uploadProduct.get('language');
  }
  get productPrice() {
    return this.uploadProduct.get('price');
  }
  get uploadImage() {
    return this.uploadProduct.get('image');
  }
  // upload alert message
  uploadFile() {
    this.valueValid = !this.valueValid;
  }
  uploadInValidFile() {
    this.valueInvalid = !this.valueInvalid;
  }
  //  upload image
  onSelectFile(event: any) {
    const input = event.target;
    this.ImageName = input.files[0].name;
  }
  // submit upload product images
  onUpload() {
    this.submitted = true;
    // this is validation message
    if (this.uploadProduct.invalid) {
      this.uploadProduct.markAllAsTouched();
      return;
    }
    // upload product data value
    this.bookData = this.uploadProduct.value;
    // this is product upload
    this.productUpload
      .uploadProduct({
        name: this.bookData.name,
        author: this.bookData.author,
        binding: this.bookData.binding,
        language: this.bookData.language,
        price: this.bookData.price,
        image: this.ImageName,
      })
      .subscribe(
        (res: any) => {
          this.valueValid = true; 
        },
        (err) => {
          this.valueInvalid = true;
        }
      );
  }
}
