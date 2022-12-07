package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Stop;
import road.trip.api.persistence.StopRepository;

import java.util.List;

@Service
public class StopService {

    @Autowired
    StopRepository stopRepository;

    @Autowired
    TripService tripService;

    public List<Stop> getRecommendedStops(long tripId) {
        return tripService.findTripById(tripId).getRoute().getStops();
    }

    public void addStops(List<Stop> stops) {
        for (Stop value : stops) {
            stopRepository.save(value);
        }
    }

    public Stop findStopById(Long id) {
        return stopRepository.findById(id).get();
    }
}
