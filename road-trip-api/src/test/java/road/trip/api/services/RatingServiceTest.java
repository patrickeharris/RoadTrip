package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Rating;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RatingServiceTest {

    @Autowired
    RatingService ratingService;

    /*
    @Test
    public void testGetRatings() throws Exception {
        assertNotNull(ratingService.getRatings());
    }
*/
}
