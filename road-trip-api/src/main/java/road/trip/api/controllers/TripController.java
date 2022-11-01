package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Stop;
import road.trip.api.persistence.Trip;
import road.trip.api.services.RouteService;
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
    private RouteService routeService;

    @PostMapping("/create-trip")
    public Trip createTrip(@RequestBody Trip trip) throws GeneralSecurityException, IOException, MessagingException {
        return tripService.makeTrip(trip);
    }

    @PostMapping("/edit-trip")
    public Trip editTrip(@RequestBody Trip trip) {
        return tripService.editTrip(trip);
    }

    @GetMapping("/trips")
    public @ResponseBody Iterable<Trip> findAllTrips() {
        return tripService.getTrips();
    }

    /*
    @DeleteMapping("/delete-trip")
    public Trip deleteTrip(Long tripId) {
        return tripService.deleteTrip(tripId);
    }

    @GetMapping("/recommended-stops")
    public Iterable<Stop> getRecommendedStops(Long routeId) {

        return routeService.getRecommendedStops(routeId);
    }
     */
}
