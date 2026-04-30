import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit {
  userRegister: any = {
    Name: '',
    MobileNo: '',
    Password: ''
  };

  loginObj: any = {
    Name: '',
    Password: ''
  };
  cartItems:any[]=[];

 loggedUser:any;
 searchText: string = '';
  searchResults: any[] = [];

 ngOnInit(){

  const user=localStorage.getItem('ecomUser');

  if(user){
    this.loggedUser=JSON.parse(user);
    this.getCartWithProducts();
  }
 }

  constructor(private productSr: ProductService,
    private router: Router) {}
  


  
  // 🔥 REGISTER
  onRegister() {
    this.productSr.onRegister(this.userRegister)
      .then(() => {
        alert('Signup Success');
        this.userRegister = { Name: '', MobileNo: '', Password: '' };
      })
      .catch(err => {
        console.error(err);
        alert('Error');
      });
  }

  // 🔥 LOGIN
  onlogin() {
    this.productSr.onLogin(this.loginObj)
      .then((user) => {

        alert('Login Success');

        console.log('USER:', user);

        // تخزين المستخدم الحالي
        localStorage.setItem('ecomUser', JSON.stringify(user));
        this.loggedUser = user;       // مهم
        this.getCartWithProducts();

      })
      .catch(err => {
        console.error(err);
        alert('Invalid username or password');
      });
  }
  getCartWithProducts(){

    this.productSr
     .getCartByCustomerId(this.loggedUser.id)
     .subscribe((cartRes:any)=>{
  
        this.productSr
         .getAllProduct()
         .subscribe((products:any[])=>{
  
           this.cartItems = cartRes.map((cart:any)=>{
  
              const product =
               products.find(
                 p=> p.productId == cart.productId
               );
  
              return{
                ...cart,
                productName: product?.productName,
                productPrice: product?.productPrice,
                productImageUrl: product?.productImageUrl
              };
  
           });
  
           console.log(this.cartItems);
  
         });
  
     });
  
   }
   removeCartProduct(cartId:string){

    this.productSr
      .removeCartProduct(cartId)
      .then(()=>{
   
         this.getCartWithProducts();
   
      })
      .catch(err=>{
         console.error(err);
      });
   
   }
  
  // 🔥 البحث
  onSearch() {
    this.productSr.searchText$.next(this.searchText);
  }

  // 🔥 عند الضغط على منتج من القائمة
  goToProduct(item: any) {

    console.log('Selected product:', item);

    // تنظيف البحث
    this.searchResults = [];
    this.searchText = item.productName;

    // إذا عندك صفحة تفاصيل منتج
    this.router.navigate(['/product', item.id]);

  }
}
