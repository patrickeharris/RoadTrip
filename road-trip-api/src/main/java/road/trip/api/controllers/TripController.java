package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Stop;
import road.trip.api.persistence.Trip;
import road.trip.api.services.StopService;
import road.trip.api.services.TripService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class TripController {

    @Autowired
    private TripService tripService;

    @Autowired
    private StopService stopService;

    @PostMapping("/create-trip")
    public Trip createTrip(@RequestBody Trip trip) throws GeneralSecurityException, IOException, MessagingException {
        Trip t = tripService.createTrip(trip);
        stopService.addStops(trip.getRoute().getStops(), t.getTrip_id());
        return t;
    }

    @PostMapping("/edit-trip")
    public Trip editTrip(@RequestBody Trip trip) {
        return tripService.editTrip(trip);
    }

    @GetMapping("/trips")
    public @ResponseBody Iterable<Trip> findAllTrips() {
        return tripService.findAllTrips();
    }

    @GetMapping("/stops")
    public @ResponseBody Iterable<Stop> getRecommendedStops(@RequestParam(value = "tripId", required = false) Long tripId) {
        return stopService.getRecommendedStops(tripId);
    }

    @DeleteMapping("/cancel-trip")
    public Trip deleteTrip(@RequestParam Long tripId) {
        return tripService.deleteTrip(tripId);
    }
}
