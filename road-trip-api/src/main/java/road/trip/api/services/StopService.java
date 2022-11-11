package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Stop;
import road.trip.api.persistence.StopRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class StopService {

    @Autowired
    StopRepository stopRepository;

    @Autowired
    TripService tripService;

    public List<Stop> getStopsByTripId(long tripId) {
        List<Stop> finalStops = new ArrayList<>();
        List<Stop> stops = stopRepository.findAll();

        finalStops = tripService.findTripById(tripId).getRoute().getStops();

        return finalStops;
    }

    public void addStops(List<Stop> stops, long trip_id) {
        List<Stop> curStops = tripService.findTripById(trip_id).getRoute().getStops();
        for(int i = 0; i < curStops.size(); i++){
            stops.add(curStops.get(i));
        }
        stopRepository.saveAll(stops);
    }

    /*
    public Stop findStopByLoc(Double loc) {
        return stopRepository.findByLoc(loc).get();
    }

    public void getStopInfo() {

    }

    public void createStop() {

    }
     */
}
