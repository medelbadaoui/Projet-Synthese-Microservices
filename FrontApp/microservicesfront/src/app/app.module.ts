import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterseptorService } from './services/request-interseptor.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { BillsComponent } from './bills/bills.component';
import { CreateBillComponent } from './create-bill/create-bill.component';


export function kcFactory(kcSecService:KeycloakSecurityService) {
  return ()=>kcSecService.init();
  }
  
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    CreateProductComponent,
    ProductDetailsComponent,
    CreateCustomerComponent,
    CustomerDetailsComponent,
    BillsComponent,
    CreateBillComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide:APP_INITIALIZER, deps:[KeycloakSecurityService], useFactory:kcFactory, multi:true },
    { provide:HTTP_INTERCEPTORS, useClass:RequestInterseptorService, multi:true }

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
