package org.sid.billingservice.feign;

import org.sid.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "INVENTORY-SERVICE")
public interface InventoryServiceClient{
    String AUTH_TOKEN = "Authorization";
    
    @GetMapping("/products/{id}")
    Product findProductById(@RequestHeader(value = AUTH_TOKEN) String bearerToken,@PathVariable("id") Long id);

    @GetMapping("/products")
    PagedModel<Product> findAll(@RequestHeader(value = AUTH_TOKEN) String bearerToken);
}