package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Rating;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RatingServiceTest {

    Rating r1 = new Rating(1L, 14L, 5, 3, "Wife and kids had a fantastic time, the app made it so much easier to navigate the trip!");

    @Autowired
    RatingService ratingService;

    @Test
    public void testGetRatings() throws Exception {
        assertNotNull(ratingService.getRatings());
    }

    @Test
    public void testSaveRating() {
        int size = ratingService.getRatings().size();
        ratingService.saveRating(r1);
        assertTrue(ratingService.getRatings().size() > size);
    }
    
}
