package mz.co.wyrmic_software.appload.lead;

import lombok.Data;

@Data
public class LeadPojo {
    private String leadId;
    private String clientName;
    private String productName;
    private String requestDate;
    private int qty;
}
