import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import { KeycloakInstance } from 'keycloak-js';


declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc:KeycloakInstance;

  constructor(private http:HttpClient) {}
  public async init(){
    console.log("Test Initialisation");
    this.kc=new Keycloak({
      url:"http://localhost:8080/auth",
      realm:"webapp-realm",
      clientId:"FrontApp"
    });
    await this.kc.init({
    //onLoad:"login-required",
    onLoad:"check-sso",
    
    //promiseType:"native"
    });
    console.log(this.kc.token);
}


public getBills(){
  return this.http.get("http://localhost:8083/bills");
}



}
