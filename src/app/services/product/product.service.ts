import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   constructor(private http:HttpClient ) {}

  getProducts() { 
   return this.http.get(environment.apiPath + 'product');
  }
  uploadProduct(data:any) {
    return this.http.post(environment.apiPath + 'product', data);
  }
}
