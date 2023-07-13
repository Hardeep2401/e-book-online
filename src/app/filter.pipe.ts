import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // this is filter for language
  transform(products: any[], searchLanguage: string, searchBinding: string, searchPrice: any): any[] {
    if (searchLanguage === 'all' && searchBinding === 'all' && searchPrice === 'all') {
      return products;
    }
  // set price range 
    let minPrice: number;
    let maxPrice: number;
    if (searchPrice === '50') {
      minPrice = 0;
      maxPrice = 50;
    } else if (searchPrice === '100') {
      minPrice = 0;
      maxPrice = 100;
    } else if (searchPrice === '150') {
      minPrice = 101;
      maxPrice = 150;
    } else if (searchPrice === '200') {
      minPrice = 151;
      maxPrice = 200;
    } else if (searchPrice === '300') {
      minPrice = 250;
      maxPrice = 300;
    } else if (searchPrice === '500') {
      minPrice = 201;
      maxPrice = 500;
    }
    return products.filter((product) => {
      let matchLanguage = true;
      let matchBinding = true;
      let matchPrice = true;
      if (searchLanguage !== 'all') {
        matchLanguage = product.language === searchLanguage;
      }
      if (searchBinding !== 'all') {
        matchBinding = product.binding === searchBinding;
      }
      if (searchPrice !== 'all') {
        matchPrice = product.price >= minPrice && product.price <= maxPrice;
      }
      return matchLanguage && matchBinding && matchPrice;
    });
  }
}
