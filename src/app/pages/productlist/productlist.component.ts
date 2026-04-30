import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory, Iproduct,Cart } from '../../core/model/model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {

  productlist: Iproduct[] = [];
  categoryList: ICategory[] = [];
  filteredProducts: Iproduct[] = [];
  loggedUserId: string = '';
  searchText: string = '';
  //cartObj: CartClass = new CartClass();
  //cartObj: any = {
   // custId: '',
   // productId: '',
   // quantity: 1,
    //addedDate: new Date()
  //};
  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    const loggedUser = localStorage.getItem('ecomUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      this.loggedUserId = user.id;
    }
    this.productService.searchText$.subscribe(text => {

      this.searchText = text;
  
      if (!text || text.trim() === '') {
        this.filteredProducts = this.productlist;
        return;
      }
  
      this.filteredProducts = this.productlist.filter(p =>
        p.productName?.toLowerCase().includes(text.toLowerCase())
      );
  
    })
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(res => {
      this.productlist = res;
      this.filteredProducts = res;
    });
  }
  getAllCategory(){
    this.productService.getAllCategories().subscribe(res => {
     this.categoryList = res;
    });
  }
  
// 🔹 فلترة
filterByCategory(catId: number) {
  this.filteredProducts = this.productlist.filter(p => p.categoryId == catId);
}

// 🔹 رجوع لكل المنتجات
showAll() {
  this.filteredProducts = this.productlist;
}
  // 🛒 ADD TO CART
  // 🛒 ADD TO CART
 // 🛒 ADD TO CART
 addToCart(productId: any) {

 // console.log('clicked productId:', productId);

  const user = JSON.parse(localStorage.getItem('ecomUser') || '{}');

  if (!user.id) {
    alert('Please login first');
    return;
  }

  const cart = {
    custId: user.id,
    productId: productId,
    quantity: 1,
    addedDate: new Date()
  };

  this.productService.onAddToCart(cart)
    .then(() => {
      alert('Added to cart');
    })
    .catch(err => {
      console.error('Error:', err);
    });
}
}