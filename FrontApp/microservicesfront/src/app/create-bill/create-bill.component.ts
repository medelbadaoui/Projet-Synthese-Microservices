import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { CustomersService } from '../services/customers.service';
import { KeycloakSecurityService } from '../services/keycloak-security.service';
import { ProductitemService } from '../services/productitem.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {

  products:any;
  customers:any;
  customer:any;
  submitted = false;
  errorMessage:any;
  productItems:any=[];
  billId:any;
  
  productItem ={
    id:null,
    product:{},
    productID:{},
    price:0,
    quantity:1,
    bill:{}

  };
  total:number=0;
  constructor( private billService:BillsService,private productItemService:ProductitemService,private CustomerService:CustomersService,private ProductService:ProductsService,public kcService:KeycloakSecurityService) { }

  ngOnInit(): void {
    
    this.ProductService.getProducts().subscribe(data=>{

      this.products=data;
    },err=>{
      this.errorMessage=err.error.message;
      console.log(err);

    })
    this.CustomerService.getCustomers().subscribe(data=>{

      this.customers=data;
    },err=>{
      this.errorMessage=err.error.message;
      console.log(err);

    })


  }


  setCustomer(data:any):void{
    this.customer=data;
  }

 
  addproductItem(product:any){

    this.productItem.product=product;
    this.productItem.productID=product.id;
    this.productItem.price=product.price;
    
    if(!this.productItems.some((element:any) => element.product  === product)){
      this.productItems.push(this.productItem)
    }
      

    this.productItem ={
      id:null,
      product:{},
      productID:{},
      price:0,
      quantity:1,
      bill:''
    };
    this.calculatetotal();
    
  }
  deleteproductItem(product:any){
    this.productItems = this.productItems.filter(function(item:any) {
      return item.product !== product ;
    })
    this.calculatetotal();
  }
  
  calculatetotal(){
    this.total=0;
    for(var i=0;i<this.productItems.length;i++){
      this.total+=this.productItems[i].quantity*this.productItems[i].price;
    }
  }
  createBill(): void {
   const data = {
      customerID:this.customer.id,
      billingDate:new Date(),
    };
    
    this.billService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.billId=response;
          let i=0;
        for(i=0;i<this.productItems.length;i++){
          
          this.productItems[i].bill=this.billId._links.bill.href;
          
          this.productItemService.create(this.productItems[i]).subscribe(
            response => {
              console.log(response);
              this.productItems=[];
              this.customer={};
              this.total=0;
            },
            error => {
              console.log(error);
            });
        }
        console.log(this.productItems);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
