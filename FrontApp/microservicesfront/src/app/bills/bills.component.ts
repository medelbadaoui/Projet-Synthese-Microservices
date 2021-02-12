import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills:any;
  errorMessage:any;

  constructor(private billssService:BillsService,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.billssService.getBills().subscribe(data=>{

      this.bills=data;
    },err=>{
      this.errorMessage=err.error.message;
      console.log(err);
    })

  }
  

 
  public isBillingManager():boolean{ return this.kcService.kc.hasRealmRole("BILLING_MANAGER"); }
}
