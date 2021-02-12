import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer = {
    name: '',
    email: '',
  };
  submitted = false
  constructor(private customersService: CustomersService,public kcService:KeycloakSecurityService) { }

  createCustomer(): void {
    const data = {
      name: this.customer.name,
      email: this.customer.email
    };

    this.customersService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newCustomer(): void {
    this.submitted = false;
    this.customer = {
      name: '',
      email: '',
      
    };
  }
  public isCustomerManager():boolean{ return this.kcService.kc.hasRealmRole("CUSTOMER_MANAGER"); }
  ngOnInit(): void {
  }

}
