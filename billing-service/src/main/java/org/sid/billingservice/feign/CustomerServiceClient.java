package org.sid.billingservice.feign;

import org.sid.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerServiceClient{
    String AUTH_TOKEN = "Authorization";
    @GetMapping("/customers/{id}")
    Customer findCustomerById(@RequestHeader(value = AUTH_TOKEN) String bearerToken,@PathVariable("id") Long id);

    @GetMapping("/customers")
    PagedModel<Customer> findAll(@RequestHeader(value = AUTH_TOKEN) String bearerToken);
}
