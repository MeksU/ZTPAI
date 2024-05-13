package pl.meksu.rentcar.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Entity
@Table(name = "offers")
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(nullable = false, length = 5)
    private String engine;

    @Column(nullable = false)
    private int power;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false)
    private int seats;

    @Column(nullable = false)
    private int price;

    @Column(length = 255)
    private String image;
}