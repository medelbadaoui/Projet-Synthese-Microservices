package org.sid.billingservice;

import org.sid.billingservice.repository.BillRepository;
import org.sid.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.sid.billingservice.entities.Bill;
import org.sid.billingservice.entities.ProductItem;
import org.sid.billingservice.feign.*;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.model.Product;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}
	// @Bean
	// CommandLineRunner start(BillRepository billRepository,ProductItemRepository productItemRepository,RepositoryRestConfiguration repositoryRestConfiguration){
	// 	return args -> {
	// 	repositoryRestConfiguration.exposeIdsFor(Bill.class);
	// 	Bill bill = new Bill();
    //     bill.setBillingDate(new Date());
	// 	Customer customer = new Customer(1L,"Mohammed","muhammed@gmail.com");
	// 	Product p=new Product(1L,"Computer Desk Top HP",900);
    //     bill.setCustomerID(customer.getId());
    //     billRepository.save(bill);
    //     productItemRepository.save(new ProductItem(null,p,p.getId(),p.getPrice(),3, bill));
	// 	bill.setProductItems(productItemRepository.findByBillId(bill.getId()));
	// 	billRepository.delete(bill);
	// 	billRepository.findAll().forEach(System.out::println);
	// 	System.out.println(bill.getProductItems());
	// 	};
	// }

}

@RestController
class BillRestController{
	final String AUTH_TOKEN = "Authorization";
	private BillRepository billRepository;
	private ProductItemRepository productItemRepository;
	private CustomerServiceClient customerServiceClient;
	private InventoryServiceClient inventoryServiceClient;
	public BillRestController(BillRepository billRepository, ProductItemRepository productItemRepository,CustomerServiceClient customerRestClient, InventoryServiceClient productsRestClient) {
        this.billRepository = billRepository;
        this.productItemRepository = productItemRepository;
        this.customerServiceClient = customerRestClient;
        this.inventoryServiceClient = productsRestClient;
	}
	
	@GetMapping("/bills/full/{id}")
	Bill getBill(HttpServletRequest request,@PathVariable(name="id") Long id){
		
		Bill bill=billRepository.findById(id).get();
		bill.setCustomer(customerServiceClient.findCustomerById(request.getHeader(AUTH_TOKEN),bill.getCustomerID()));
		bill.setProductItems(productItemRepository.findByBillId(id));
		bill.getProductItems().forEach(pi->{
		pi.setProduct(inventoryServiceClient.findProductById(request.getHeader(AUTH_TOKEN),pi.getProductID()));});
		return bill;
	
	}
	

}
