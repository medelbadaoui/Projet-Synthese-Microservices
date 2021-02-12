import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../services/keycloak-security.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products:any;
   errorMessage:any;
  productService: ProductsService;
  router: Router;
  
 

  constructor(private productsService:ProductsService,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data=>{

      this.products=data;
    },err=>{
      this.errorMessage=err.error.message;
      console.log(err);

    })

  }
  public isProductManager():boolean{ return this.kcService.kc.hasRealmRole("PRODUCT_MANAGER"); }
  

}
