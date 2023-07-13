import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;
  productImg: any; 
  constructor(
    private productServices: ProductService,
    private WishlistService: WishlistService
  ) {} 
  // this is filter for language
  searchLanguage: string = 'all';
  searchBinding: string = 'all';
  searchPrice: any = 'all';
  

  
  // this is get Product Image from API
  ngOnInit(): void {
    this.fetchCardsFromApi();
      
  }
  fetchCardsFromApi() {
    this.productServices.getProducts().subscribe((data: any) => {
      this.productImg = data;
    });
  }
  // active class add and remove
  wishlistToggle(event: any) {
    const cardElement = event.srcElement;
    const activeClass = cardElement.classList.contains('CardWishList');
    if (activeClass) {
      cardElement.classList.remove('CardWishList');
      const removeWishCount = document.querySelectorAll('.CardWishList').length;
      this.WishlistService.setWishlistCount(removeWishCount);
    } else {
      cardElement.classList.add('CardWishList');
      const addWishCount = document.querySelectorAll('.CardWishList').length;
      this.WishlistService.setWishlistCount(addWishCount);
    }
  }
}
