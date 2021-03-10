package mz.co.wyrmic_software.appload.utility;

import lombok.extern.slf4j.Slf4j;
import mz.co.wyrmic_software.appload.category.Category;
import mz.co.wyrmic_software.appload.category.CategoryRepository;
import mz.co.wyrmic_software.appload.lead.Lead;
import mz.co.wyrmic_software.appload.lead.LeadRepository;
import mz.co.wyrmic_software.appload.product.Product;
import mz.co.wyrmic_software.appload.product.ProductRepository;
import mz.co.wyrmic_software.appload.user.ApplicationUser;
import mz.co.wyrmic_software.appload.user.UserRepository;
import mz.co.wyrmic_software.appload.user.UserRole;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class DataLoader {
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private LeadRepository leadRepository;
    private CategoryRepository categoryRepository;

    @PostConstruct
    public void initialize() {

        addCategories();

        ApplicationUser adminUser = new ApplicationUser();
        adminUser.setName("user");
        adminUser.setSurname("1");
        adminUser.setAddress(RandomStringUtils.randomAlphanumeric(7, 15));
        adminUser.setCompany("Soft Space Ware");
        adminUser.setUsername("user1@example.com");
        adminUser.setPassword("Password!");
        adminUser.setConfirmed(true);
        adminUser.setPhoneNumber("123456789");
        adminUser.setUserRole(UserRole.SYS_ADMIN);
        userRepository.save(adminUser);
        log.debug(adminUser.toString());

        ApplicationUser buyer = new ApplicationUser();
        buyer.setName("user");
        buyer.setSurname("2");
        buyer.setAddress(RandomStringUtils.randomAlphanumeric(7, 15));
        buyer.setCompany("Soft Space Ware 2");
        buyer.setUsername("user2@example.com");
        buyer.setPassword("Password");
        buyer.setConfirmed(true);
        buyer.setPhoneNumber("123456789");
        buyer.setUserRole(UserRole.BUYER);
        userRepository.save(buyer);
        log.debug(buyer.toString());

        ApplicationUser seller = new ApplicationUser();
        seller.setName("user");
        seller.setSurname("3");
        seller.setAddress(RandomStringUtils.randomAlphanumeric(7, 15));
        seller.setCompany("Soft Space Ware 3");
        seller.setUsername("user3@example.com");
        seller.setPassword("Password");
        seller.setConfirmed(true);
        seller.setPhoneNumber("123456789");
        seller.setUserRole(UserRole.SELLER);
        userRepository.save(seller);
        log.debug(seller.toString());

        List<String> productNames = Arrays.asList("Ammonium Sulphate", "Lambs", "beef steaks", "sunflower seeds",
                "Maize", "hoses", "Fava beans", "Corn flower", "mangoes", "Tomatoes", "Hake", "Amoxi-Tabs C-250");
        List<String> tags = Arrays.asList("fertilizer", "red meat", "beef", "seeds", "strach", "material",
                "dry beans", "flower", "fruit", "vegetables", "fish", "pills");

        List<String> productNames2 = Arrays.asList("oxytetracycline", "Goat", "Pork", "chia seeds", "Kassava",
                "tractors", "coffee beans", "kassava flower", "pineapple", "carrots", "Tuna fish", "Proventis");
        List<String> tags2 = Arrays.asList("pesticide", "local", "foreign", "imported", "artisanal", "heavy duty",
                "beans", "artisanal flower", "fruits", "vegetable", "salt water fish", "vaccines");
        int n = 0;
        while (n < 2) {
            int i = 0;

            for (Category cat : categoryRepository.findAll()) {
                Product product = new Product();
                if (n == 0) {
                    product.setName(productNames.get(i));
                    product.addTag(tags.get(i));
                } else {
                    product.setName(productNames2.get(i));
                    product.addTag(tags2.get(i));
                }

                product.setDescription(RandomStringUtils.randomAlphabetic(3, 100));
                product.setCategory(cat.getName());
                product.setCertification(RandomStringUtils.randomAlphabetic(5, 13));
                product.setOrigin(RandomStringUtils.randomAlphabetic(5, 13));
                product.setWeight((i * 7 + 32) / 2);
                product.setUnitPrice(Double.parseDouble(RandomStringUtils.randomNumeric(2, 4)));
                product.setQuantity(Double.parseDouble(RandomStringUtils.randomNumeric(2, 4)));
                product.setDatePublished(LocalDateTime.now());
                product.setUnit("kg");
                product.setDateAvailable(LocalDateTime.now());
                product.setDateExpired(LocalDateTime.now());
                product.setDateProduced(LocalDateTime.now());
                product.setSeller(seller);
                product.setApproved(true);
                productRepository.save(product);
                log.debug(product.toString());

                Lead lead = new Lead();
                lead.setProduct(product);
                lead.setRead(false);
                lead.setUser(buyer);
                lead.setRequestDateTime(LocalDateTime.now().minusDays(i));
                lead.setDeliveryAddress(RandomStringUtils.randomAlphabetic(5, 13));
                lead.setProvince(RandomStringUtils.randomAlphabetic(3, 7));
                lead.setQty(i * n);
                leadRepository.save(lead);
                log.debug(lead.toString());

                i++;
            }
            n++;
        }

    }

    private void addCategories() {
        List<String> categoryNames = Arrays.asList("CEREAIS", "FEIJOES", "LEGUMES_E_HORTICULAS", "PEIXE",
                "ANIMAIS_DE_CRIACAO", "CEMENTES_E_MATERIAL_DE_PLATACAO", "FERTILIZANTES", "AGROQUIMICOS",
                "PRODUTOS_VETERINARIOS", "EQUIPAMENTO_AGRICOLA", "CARNES_E_DERIVADOS", "FRUTA");
        categoryNames.forEach(name -> {
            Category category = new Category();
            category.setName(name);
            categoryRepository.save(category);
        });
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setLeadRepository(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Autowired
    public void setCategoryRepository(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
}
