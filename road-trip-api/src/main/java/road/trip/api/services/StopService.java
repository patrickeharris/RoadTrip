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

    public List<Stop> getStopsByTripId(long tripId) {
        List<Stop> finalStops = new ArrayList<>();
        List<Stop> stops = stopRepository.findAll();

        stops.forEach(s -> {
            Long id = s.getTrip_id();
            if (id != null) {
                if (s.getTrip_id().equals(tripId)) {
                    finalStops.add(s);
                }
            }
        });

        return finalStops;
    }

    public void addStops(List<Stop> stops, long trip_id) {
        stops.forEach(s -> {
            s.setTrip_id(trip_id);
        });
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
