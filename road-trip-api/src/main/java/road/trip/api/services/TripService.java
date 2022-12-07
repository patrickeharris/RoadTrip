package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Properties;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private StopRepository stopRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    public Trip findTripById(Long id) {
        return tripRepository.findById(id).get();
    }

    public Trip createTrip (Trip trip) throws GeneralSecurityException, IOException, MessagingException {
        System.out.println(trip);
        for(int i = 0; i < trip.getRoute().getStops().size(); i++){
            System.out.println(trip.getRoute().getStops().get(i).getStopName());
            Stop s = stopRepository.save(trip.getRoute().getStops().get(i));
            System.out.println(s.getStopName());
        }
        Route r = routeRepository.save(trip.getRoute());
        Trip t = tripRepository.save(trip);
        System.out.println(t);

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
