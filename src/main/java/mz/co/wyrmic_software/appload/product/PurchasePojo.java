package mz.co.wyrmic_software.appload.product;

import lombok.Data;

import java.util.UUID;

@Data
public class PurchasePojo {
    private UUID userId;
    private String purchaseAddress;
    private String province;
    private int qty;
}
