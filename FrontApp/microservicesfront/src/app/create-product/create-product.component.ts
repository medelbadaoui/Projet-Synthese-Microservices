import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from '../services/keycloak-security.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product = {
    name: '',
    price: '',
  };
  submitted = false
  constructor(private productsService: ProductsService,public kcService:KeycloakSecurityService) { }
  public isProductManager():boolean{ return this.kcService.kc.hasRealmRole("PRODUCT_MANAGER"); }

  createProduct(): void {
    const data = {
      name: this.product.name,
      price: this.product.price
    };

    this.productsService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      price: '',
      
    };
  }

  ngOnInit(): void {
  }

}
