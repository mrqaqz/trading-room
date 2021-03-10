package mz.co.wyrmic_software.appload.product;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import mz.co.wyrmic_software.appload.tag.Tag;
import mz.co.wyrmic_software.appload.user.ApplicationUser;

@Entity
@Data
public class Product implements Serializable {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column
    private String description;
    @Column(nullable = false)
    private String category;
    @Column
    private String certification;
    @Column(nullable = false)
    private float weight;
    @Column(nullable = false)
    private double quantity;
    @Column(nullable = false)
    private LocalDateTime datePublished;
    @Column
    private LocalDateTime dateProduced;
    @Column
    private LocalDateTime dateExpired;
    @Column(nullable = false)
    private String origin;
    @Column
    private LocalDateTime dateAvailable;
    @Column(nullable = false)
    private double unitPrice;
    @Column(nullable = false)
    private String unit;
    @ManyToOne
    private ApplicationUser seller;
    @Column
    private boolean approved;
    @Column
    private int requestCount;
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinTable(name = "Product_Tags", joinColumns = {@JoinColumn(name = "product_id")}, inverseJoinColumns = {
            @JoinColumn(name = "tag_id")})
    private List<Tag> tags = new ArrayList<>();

    public void addTag(String tag) {
        Tag addedTag = new Tag(tag);
        tags.add(addedTag);
    }
}
