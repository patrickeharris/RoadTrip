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

    public List<Stop> getRecommendedStops(long tripId) {
        List<Stop> finalStops = new ArrayList<>();
        List<Stop> stops = stopRepository.findAll();

        finalStops = tripService.findTripById(tripId).getRoute().getStops();

        return finalStops;
    }

    public void addStops(List<Stop> stops, long trip_id) {
        List<Stop> curStops = tripService.findTripById(trip_id).getRoute().getStops();
        int size = stops.size();
        for(int i = 0; i < size; i++){
            System.out.println(size);
            boolean test = false;
            for(int j = 0; j < size; j++){
                if(curStops.get(j).getStop_id() == stops.get(i).getStop_id()){
                    test = true;
                }
            }
            if(!test) {
                curStops.add(stops.get(i));
            }
        }
        stopRepository.saveAll(curStops);
    }

    public Stop findStopById(Long id) {
        return stopRepository.findById(id).get();
    }
}
