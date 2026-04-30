import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  ICategory, Iproduct } from '../model/model';
import { where } from '@angular/fire/firestore';
import { addDoc } from '@angular/fire/firestore';
import { getDocs } from '@angular/fire/firestore';
import { doc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) {}

  getAllProduct(): Observable<Iproduct[]> {

    const productRef = collection(this.firestore, 'products');

    // 🔥 ترتيب حسب productId
    const q = query(productRef, orderBy('productId', 'asc'));

    return collectionData(q, { idField: 'id' }).pipe(
      map((res: any[]) => {
        return res.map(item => {
          return {
            ...item,

            // 🖼 تعديل مسار الصورة تلقائي
            productImageUrl: item.productImageUrl?.startsWith('assets')
              ? item.productImageUrl
              : 'assets/' + item.productImageUrl,

            // ⭐️ بيانات إضافية (اختياري)
            rating: 4,
            discount: '35% Off'
          };
        });
      })
    ) as Observable<Iproduct[]>;

  }

  getAllCategories(): Observable<ICategory[]> {

    const categoryRef = collection(this.firestore, 'categories');
  
    return collectionData(categoryRef, { idField: 'id' }) as Observable<ICategory[]>;
  
  }
  //getProductsByCategoryId(catId: number): Observable<Iproduct[]> {

    //const productRef = collection(this.firestore, 'products');
  
    //const q = query(productRef, where('categoryId', '==', catId));
  
    //return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>;
  
  //}
  
    // 🔥 REGISTER
    onRegister(obj: any) {
      const userRef = collection(this.firestore, 'users');
      return addDoc(userRef, obj);
    }

   // 🔥 LOGIN
   async onLogin(loginObj: any) {
    const userRef = collection(this.firestore, 'users');

    const snapshot = await getDocs(userRef);

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));

    const user = users.find(u =>
      u.Name === loginObj.Name &&
      u.Password === loginObj.Password
    );

    if (user) {
      localStorage.setItem('ecomUser', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Invalid username or password');
    }
  }

  // 🛒 ADD TO CART
  onAddToCart(obj: any) {
    const cartRef = collection(this.firestore, 'carts');
    return addDoc(cartRef, obj);
  }
  // 🛒 جلب سلة مستخدم معيّن
 getCartByCustomerId(custId:string){
  const cartRef = collection(this.firestore,'carts');

  const q = query(
    cartRef,
    where('custId','==',custId)
  );

  return collectionData(q,{idField:'cartId'});
}
removeCartProduct(cartId:string){

  const cartDocRef = doc(
    this.firestore,
    `carts/${cartId}`
  );
 
  return deleteDoc(cartDocRef);
 
 }
 searchText$ = new BehaviorSubject<string>('');
}