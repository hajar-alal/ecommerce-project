import { Routes } from '@angular/router';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:ProductlistComponent},
    {path:'checkout',component:CheckoutComponent},
    {path: 'contact',component: ContactComponent},
    {path:'**',component:ProductlistComponent}
];
