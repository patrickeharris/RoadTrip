package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.RegisterRepository;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.TripRepository;
import road.trip.api.persistence.User;

import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    public Trip makeTrip (Trip trip) {
        System.out.println("test1");
        System.out.println(trip);
        Trip t = tripRepository.save(trip);
        System.out.println(t);
        System.out.println("test2");
        return t;
    }

    public List<Trip> getTrips(){
        return tripRepository.findAll();
    }

}
