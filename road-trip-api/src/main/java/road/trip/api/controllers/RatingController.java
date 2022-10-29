package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Rating;
import road.trip.api.services.RatingService;

@Log4j2
@RestController
@RequestMapping("/rating")
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping("/ratings")
    public @ResponseBody Iterable<Rating> getAllRatings(@RequestParam(value = "tripId", required = false) Long tripId) {
        if (tripId == null) {
            return ratingService.getRatings();
        } else {
            return ratingService.getRatingsByTripId(tripId);
        }
    }

    @PostMapping("/add-rating")
    public Rating saveRating(@RequestBody Rating rating) {
        return ratingService.saveRating(rating);
    }
}
