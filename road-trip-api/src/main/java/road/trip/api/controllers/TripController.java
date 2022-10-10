package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.User;
import road.trip.api.services.RegisterService;
import road.trip.api.services.TripService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class TripController {

    @Autowired
    private TripService tripService;


    @PostMapping("/create-trip")
    public Trip createTrip(@RequestBody Trip trip) {
        System.out.println("test3");
        return tripService.makeTrip(trip);
    }

    @GetMapping("/trips")
    public @ResponseBody Iterable<Trip> findAllTrips() {
        return tripService.getTrips();
    }
}
