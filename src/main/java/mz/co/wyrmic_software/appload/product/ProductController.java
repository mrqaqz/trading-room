package mz.co.wyrmic_software.appload.product;

import lombok.extern.slf4j.Slf4j;
import mz.co.wyrmic_software.appload.lead.Lead;
import mz.co.wyrmic_software.appload.lead.LeadRepository;
import mz.co.wyrmic_software.appload.tag.Tag;
import mz.co.wyrmic_software.appload.user.ApplicationUser;
import mz.co.wyrmic_software.appload.user.UserRepository;
import mz.co.wyrmic_software.appload.utility.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
@Slf4j
public class ProductController {

    private final String NOT_FOUND = "Product not found";

    private ProductRepository productRepository;
    private UserRepository userRepository;
    private LeadRepository leadRepository;
    private Validator validator;

    @PostMapping(value = "/publish")
    public ResponseEntity<Product> publish(@RequestBody Product product) {
        // TODO validate product;
//        try {
        log.info("Product publication request received...");
        log.debug(product.toString());
        product.setRequestCount(0);
        product.setDatePublished(LocalDateTime.now());
//            validateProduct(product);
        productRepository.save(product);
        log.info("Product publication complete.");
        return new ResponseEntity<>(product, HttpStatus.OK);
//        } catch (InvalidProductName e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product name.", e);
//        }
    }

    @PostMapping(value = "/approve/{id}")
    public ResponseEntity<Product> approve(@PathVariable String id) {
        try {
            log.info("Approving product {}...", id);
            Product product = productRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            if (product.isApproved())
                throw new ProductAlreadyApprovedException();
            product.setApproved(true);
            log.debug("Approved set to {}", product.isApproved());
            log.info("Product approved.");
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        } catch (ProductAlreadyApprovedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product already approved", e);
        }
    }

    // TODO include address
    @PostMapping(value = "/purchase/{id}")
    public ResponseEntity<Product> purchase(@PathVariable String id, @RequestBody PurchasePojo purchasePojo) {
        try {
            log.info("Purchase request received for product {}...", id);
            Product product = productRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            log.debug(product.toString());
            product.setRequestCount(product.getRequestCount() + 1);
            productRepository.saveAndFlush(product);
            ApplicationUser user = userRepository.findById(purchasePojo.getUserId())
                    .orElseThrow(EntityNotFoundException::new);
            log.debug(user.toString());
            registerLead(product, user, purchasePojo);
            log.info("Purchase request completed.");
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getOne(@PathVariable String id) {
        try {
            log.debug("fetching product id {}", id);
            Product product = productRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            log.debug("product fetched");
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }

    }

    // This doesn't work very well cause the product changes regardless of approval
    // so if it's denied
    // it doesn't automatically revert
    @PostMapping(value = "/edit/{id}")
    public ResponseEntity<Product> edit(@PathVariable String id, @RequestBody Product newProduct) {
        try {
            log.info("Edit request received for product {}...", id);
            log.debug("New parameters {}", newProduct.toString());
            Product product = productRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            mapToProduct(product, newProduct);
            productRepository.save(product);
            log.info("Edit request completed.");
            return new ResponseEntity<>(newProduct, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }

    private void mapToProduct(Product to, Product from) {
        log.debug("Mapping {} to {}...", from.toString(), to.toString());
        to.setName(from.getName());
        to.setCategory(from.getCategory());
        to.setUnitPrice(from.getUnitPrice());
        to.setApproved(false);
        log.debug("Mapping completed {}.", to.toString());
    }

    private void registerLead(Product product, ApplicationUser user, PurchasePojo purchasePojo) {
        Lead lead = new Lead();
        lead.setProduct(product);
        lead.setUser(user);
        lead.setRead(false);
        lead.setRequestDateTime(LocalDateTime.now());
        lead.setDeliveryAddress(purchasePojo.getPurchaseAddress());
        lead.setProvince(purchasePojo.getProvince());
        lead.setQty(purchasePojo.getQty());
        leadRepository.saveAndFlush(lead);
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setValidator(Validator validator) {
        this.validator = validator;
    }

    @Autowired
    public void setLeadRepository(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

}
