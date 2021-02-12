package org.sid.billingservice.model;

import lombok.Data;

@Data
public class Product {
    private Long id;
    private String name;
    private double price;

    public Product(Long id,String name,double price){
        this.id=id;
        this.name=name;
        this.price=price;
    }

}
