package ru.borisova.boostingservice.models.viewModels;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ListOrder {
    public Long id;
    public LocalDate dateOfCreate;
    public Integer startMMR;
    public Integer endMMR;
    public Integer countLP;
    public Integer cost;
    public String status;
}
