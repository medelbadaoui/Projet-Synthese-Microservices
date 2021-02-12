import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  currentcustomer :any;
  message = '';

  constructor(
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.message = '';
    this.getCustomer(this.route.snapshot.paramMap.get('id'));
  }

  getCustomer(id:any): void {
    this.customerService.read(id)
      .subscribe(
        customer => {
          this.currentcustomer = customer;
          console.log(customer);
        },
        error => {
          console.log(error);
        });
  }

  updateCustomer(): void {
    this.customerService.update(this.currentcustomer.id, this.currentcustomer)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The customer was updated!';
          //this.router.navigate(['/customers']);
        },
        error => {
          console.log(error);
        });
  }

  deleteCustomer(): void {
    this.customerService.delete(this.currentcustomer.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log(error);
        });
  }
  public isCustomerManager():boolean{ return this.kcService.kc.hasRealmRole("CUSTOMER_MANAGER"); }
}
