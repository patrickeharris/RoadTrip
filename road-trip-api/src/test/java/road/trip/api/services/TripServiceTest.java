package road.trip.api.services;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Trip;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TripServiceTest {
    @Autowired
    TripService tripService;


    Trip trip = new Trip(10000L, "Test Trip", "Houston", "Houston", "Fort Worth",
            "Fort Worth", "11/8/2022", "Y", "Y", 1L, "route",
            3L, null);
    Trip trip2 = new Trip(10000L, "Test Duplicate", "Houston", "Houston", "Fort Worth",
            "Fort Worth", "11/8/2022", "Y", "Y", 1L, "route",
            3L, null);

/*
    @AfterEach
    public void cleanup() {
        System.out.println("Cleaning up");
        tripService.deleteTrip(100L);
    }

 */

    @Test
    void testGetTrips(){
        assertTrue(tripService.getTrips().size() > 0);
    }

    @Test
    void testDeleteTrip() throws MessagingException, GeneralSecurityException, IOException {
        trip = tripService.makeTrip(trip);
        int size = tripService.getTrips().size();
        tripService.deleteTrip(trip.getTrip_id());
        assertTrue(tripService.getTrips().size() < size);
    }

    @Test
    void testMakeTrip() throws MessagingException, GeneralSecurityException, IOException {
        int size = tripService.getTrips().size();
        tripService.makeTrip(trip);
        assertTrue(tripService.getTrips().size() > size);
    }

    @Test
    void testEditTrip() throws MessagingException, GeneralSecurityException, IOException {
        trip = tripService.makeTrip(trip);
        trip2.setTrip_id(trip.getTrip_id());
        tripService.editTrip(trip2);
        assertNotEquals(trip, tripService.findTripById(trip2.getTrip_id()));
    }
}
