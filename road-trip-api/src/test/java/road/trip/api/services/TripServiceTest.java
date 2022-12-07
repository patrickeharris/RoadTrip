package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Route;
import road.trip.api.persistence.Trip;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class TripServiceTest {

    @Autowired
    TripService tripService;

    @Test
    @Transactional
    void testCreateTrip() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        assertThat(result).isNotNull();
    }

    @Test
    @Transactional
    void testFindTripById() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        Trip result2 = tripService.findTripById(result.getTrip_id());
        assertThat(result).isNotNull();
        assertThat(result.getTrip_id()).isEqualTo(result2.getTrip_id());
    }

    @Test
    @Transactional
    void testEditTrip() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        result.setDate("2023-11-21");
        Trip result2 = tripService.editTrip(result);

        assertThat(result2.getDate()).isEqualTo("2023-11-21");
    }

    @Test
    @Transactional
    void testDeleteTrip() throws MessagingException, GeneralSecurityException, IOException {
        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
        Trip result = tripService.createTrip(testTrip);

        tripService.deleteTrip(result.getTrip_id());

        assertThrows(NoSuchElementException.class, () -> {
            tripService.findTripById(result.getTrip_id());
        });
    }

    @Test
    @Transactional
    void testFindAllTrips() {
        List<Trip> result = tripService.findAllTrips();

        assertThat(result).isNotNull();
    }
}
