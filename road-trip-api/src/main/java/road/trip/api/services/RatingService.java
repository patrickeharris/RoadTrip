package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Rating;
import road.trip.api.persistence.RatingRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    public Rating findRatingById(Long id) {
        return ratingRepository.findById(id).get();
    }

    public List<Rating> getRatings() {
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
        return ratingRepository.save(rating);
    }
}
