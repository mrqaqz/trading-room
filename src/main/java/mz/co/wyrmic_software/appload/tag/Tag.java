package mz.co.wyrmic_software.appload.tag;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mz.co.wyrmic_software.appload.product.Product;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Tag implements Serializable {

    @Id
    @NonNull
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();
}
