import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { KeycloakSecurityService } from './services/keycloak-security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isAdmin:boolean;
  ngOnInit(): void {
  this.isAdmin=this.kcService.kc.hasRealmRole("CUSTOMER_MANAGER");
  }
  constructor(public kcService:KeycloakSecurityService){}
  onLogout() { this.kcService.kc.logout(); }
  onChangePassword() { this.kcService.kc.accountManagement(); }
  onLogin() { this.kcService.kc.login(); }
  public isProductManager():boolean{ return this.kcService.kc.hasRealmRole("PRODUCT_MANAGER"); }
  public isCustomerManager():boolean{ return this.kcService.kc.hasRealmRole("CUSTOMER_MANAGER"); }
  public isBillingManager():boolean{ return this.kcService.kc.hasRealmRole("BILLING_MANAGER"); }
  title = 'microservicesfront';
}
