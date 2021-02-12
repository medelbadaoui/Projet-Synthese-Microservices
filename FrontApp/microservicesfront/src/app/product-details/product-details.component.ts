import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakSecurityService } from '../services/keycloak-security.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentproduct :any;
  message = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  getProduct(id:any): void {
    this.productService.read(id)
      .subscribe(
        product => {
          this.currentproduct = product;
          console.log(product);
        },
        error => {
          console.log(error);
        });
  }

  


  updateProduct(): void {
    this.productService.update(this.currentproduct.id, this.currentproduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
          //this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentproduct.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
  public isProductManager():boolean{ return this.kcService.kc.hasRealmRole("PRODUCT_MANAGER"); }
}
