package pl.meksu.rentcar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.meksu.rentcar.dto.ReservationDTO;
import pl.meksu.rentcar.models.Reservation;
import pl.meksu.rentcar.models.User;
import pl.meksu.rentcar.models.Offer;
import pl.meksu.rentcar.repo.ReservationRepository;
import pl.meksu.rentcar.repo.UserRepository;
import pl.meksu.rentcar.repo.OfferRepository;

import java.util.List;

@Service
@Transactional
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OfferRepository offerRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public List<Reservation> getReservationsByUserId(int userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getReservationsByOfferId(int offerId) {
        return reservationRepository.findByOfferId(offerId);
    }

    public Reservation createReservation(ReservationDTO reservationDTO) {
        User user = userRepository.findById(reservationDTO.getUser())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Offer offer = offerRepository.findById(reservationDTO.getOffer())
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setOffer(offer);
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(int id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Reservation not found");
        }
    }
}
