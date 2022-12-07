package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StopService stopService;

    @Autowired
    private NotificationService notificationService;

    public Trip findTripById(Long id) {
        return tripRepository.findById(id).get();
    }

    public Trip createTrip (Trip trip) throws GeneralSecurityException, IOException, MessagingException {

        if (trip.getRoute() != null) {
            stopService.addStops(trip.getRoute().getStops());
            Route r = routeRepository.save(trip.getRoute());
        }

        return tripRepository.save(trip);
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

    public List<Trip> findAllTrips(){
        return tripRepository.findAll();
    }

    public Trip deleteTrip(Long trip_Id) {
        Trip trip = findTripById(trip_Id);
        tripRepository.deleteById(trip_Id);

        Notification n = new Notification();
        n.setUser(trip.getUser_id());
        n.setNotification(trip.getTripName() + " has been deleted.");
        n.setTimestamp(LocalDate.now());
        notificationService.addNotification(n);

        return trip;
    }
}
