import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  products: any;
  searchBox: any = '';
  filteredProducts: any;
  wishlistData: any;
  wishlistNumber: any;
  wishlistLength: any;
  localData : any;
  constructor(
    private WishlistService: WishlistService,
    private productServices: ProductService
  ) { }
  // count of wishlist number
  listData:any;

  // implement OnInit
  ngOnInit() {
    this.getProductData();
    this.addWishlistCount(); 
    this.valueWishlist(); 
    // this.getWishlist();
  }

  valueWishlist() {
    const WishlistA = this.wishlistData = this.WishlistService.getWishlistCount();  
    const WishlistB = 01;
    this.listData = WishlistA + WishlistB ;
  }


  // this function check wishlist length
  ngDoCheck() {
    // this.getWishlist(); 
    this.valueWishlist();
  } 
  
  // getWishlist() {
  //  let store = this.wishlistData = this.WishlistService.getWishlistCount();
  //    this.localData = store;
  //   console.log(this.localData)  
  // }
  
  // this function for searching products
  getProductData() {
    this.productServices.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  // this is search bar 
  searchData() {
    const searchTermLowerCase = this.searchBox.toLowerCase();
    this.filteredProducts = this.products.filter((product: any) => {
  // console.log(searchTermLowerCase) 
      return product.name.toLowerCase().includes(searchTermLowerCase);
    });
  }

  // this is show wishlist count number 
  addWishlistCount() {
    // this.WishlistService.getWishCount().subscribe((data) => {
    //   this.wishlistNumber = data;
    //   const setWishlistLength = this.wishlistNumber.length;
    //   this.wishlistLength = setWishlistLength;
    // });
  }
}
