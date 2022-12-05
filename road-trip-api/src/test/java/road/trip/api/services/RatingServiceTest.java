package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Rating;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class RatingServiceTest {

    @Autowired
    RatingService ratingService;

    @Test
    void testGetRatings_NoException() {
        assertDoesNotThrow(() -> {
            ratingService.getRatings();
        });
    }

    @Test
    void testGetRatingsByTripId_ValidId() {
        List<Rating> ratingList = ratingService.getRatingsByTripId(163L);
        assertThat(ratingList).hasSize(3);
    }

    @Test
    void testGetRatingsByTripId_InvalidId() {
        List<Rating> ratingList = ratingService.getRatingsByTripId(-1L);
        assertThat(ratingList).isEmpty();
    }

    @Test
    void testSaveRating_Valid() {
        Rating rating = new Rating(null, null, 4, "Test rating", null, "trip", new ArrayList<>());
        
    }
}
