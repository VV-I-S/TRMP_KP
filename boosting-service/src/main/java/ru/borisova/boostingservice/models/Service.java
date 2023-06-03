package ru.borisova.boostingservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table (name="services")
@AllArgsConstructor
@NoArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String name;
    public Integer cost;
    public Integer discount;

    public Service(String name, Integer cost, Integer discount) {
        this.name = name;
        this.cost = cost;
        this.discount = discount;
    }
}