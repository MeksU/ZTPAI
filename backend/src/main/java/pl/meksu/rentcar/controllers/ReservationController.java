package pl.meksu.rentcar.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.meksu.rentcar.dto.ReservationDTO;
import pl.meksu.rentcar.models.Reservation;
import pl.meksu.rentcar.services.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable int id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(reservationService.getReservationsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationDTO reservationDTO) {
        Reservation createdReservation = reservationService.createReservation(reservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable int id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
