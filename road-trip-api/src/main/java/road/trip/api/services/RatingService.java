package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Notification;
import road.trip.api.persistence.Rating;
import road.trip.api.persistence.RatingRepository;
import road.trip.api.persistence.Trip;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    TripService tripService;

    @Autowired
    NotificationService notificationService;

    public Rating findRatingById(Long id) {
        return ratingRepository.findById(id).get();
    }

    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> getRatingsByTripId(Long tripId) {
        List<Rating> ratingsByTripId = new ArrayList<>();

        List<Rating> ratings = ratingRepository.findAll();
        for (Rating r : ratings) {
            if (r.getTrip_id().equals(tripId)) {
                ratingsByTripId.add(r);
            }
        }

        return ratingsByTripId;
    }

    public Rating saveRating(Rating rating) {
        rating.getStopRatings().forEach(r -> {
            r.setTrip_id(rating.getTrip_id());
            r.setType("stop");
            ratingRepository.save(r);
        });

        Trip trip  = tripService.findTripById(rating.getTrip_id());
        rating.setName(trip.getTripName());

        rating.setType("trip");

        Notification n = new Notification();
        n.setUser(trip.getUser_id());
        n.setNotification("Thank you for rating " + trip.getTripName() + "!");
        n.setTimestamp(LocalDate.now());
        notificationService.addNotification(n);

        return ratingRepository.save(rating);
    }
}
