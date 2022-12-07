package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Rating;
import road.trip.api.persistence.Route;
import road.trip.api.persistence.Trip;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RatingServiceTest {

    @Autowired
    RatingService ratingService;

    @Autowired
    TripService tripService;

    @Test
    void testFindAllRatings() {
        List<Rating> ratings = ratingService.findAllRatings();

        assertThat(ratings).isNotNull();
    }

    @Test
    @Transactional
    void testGetRatingsByTripId() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        List<Rating> ratings = ratingService.getRatingsByTripId(result.getTrip_id());

        assertThat(ratings).hasSize(0);
    }

    @Test
    @Transactional
    void testSaveRating() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        Rating rating = new Rating(null, result.getTrip_id(), 5, "Test rating", "This trip was awesome!", "Trip", new ArrayList<Rating>());
        Rating result2 = ratingService.saveRating(rating);

        assertThat(result2).isNotNull();
    }
}
