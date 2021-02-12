import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakSecurityService } from './keycloak-security.service';

const baseUrl="http://localhost:8081/customers";
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient,private securityService:KeycloakSecurityService) { }

  public getCustomers(){
    return this.http.get(baseUrl)
  }
  
  get(id:any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any){
    return this.http.post(baseUrl, data);
  }

  update(id:any , data:any){
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  read(id:any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

}
