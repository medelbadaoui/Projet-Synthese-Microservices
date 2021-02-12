import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './bills/bills.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: "products",component: ProductsComponent},
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: "customers",component: CustomersComponent},
  { path: "customers/create",component: CreateCustomerComponent},
  { path: "customers/:id",component: CustomerDetailsComponent},
  { path: "bills",component: BillsComponent},
  { path: "bills/create",component: CreateBillComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
