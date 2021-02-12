import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:any;
  errorMessage:any;

  constructor(private customerssService:CustomersService,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.customerssService.getCustomers().subscribe(data=>{

      this.customers=data;
    },err=>{
      this.errorMessage=err.error.message;
      console.log(err);
    })

  }
  public isCustomerManager():boolean{ return this.kcService.kc.hasRealmRole("CUSTOMER_MANAGER"); }

}
