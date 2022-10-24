package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.TripRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    public Trip findTripById(Long id) {
        return tripRepository.findById(id).get();
    }


    public Trip findTripByUser(Long user_id) {
        return tripRepository.findByUserID(user_id);
    }


    public Trip makeTrip (Trip trip) {
        System.out.println("test1");
        System.out.println(trip);
        Trip t = tripRepository.save(trip);
        System.out.println(t);
        System.out.println("test2");
        return t;
    }

    public Trip editTrip(Trip trip) {

        Trip t = findTripById(trip.getTrip_id());
        t.setDate(trip.getDate());
        t.setEnd(trip.getEnd());
        t.setStart(trip.getStart());
        t.setTripName(trip.getTripName());
        t.setUser_id(trip.getUser_id());
        t.setSelectedRoute(trip.getSelectedRoute());

        return tripRepository.save(t);
    }

    public List<Trip> getTrips(){
        return tripRepository.findAll();
    }

    /*
    public Trip deleteTrip(Long trip_Id) {

    }

    public void chooseRoute(Long routeId) {

    }

    public void choosePlaylist(Long playlistId) {

    }

    public List<Playlist> getRecommendedPlaylists(Long tripId) {

    }
    */
}
