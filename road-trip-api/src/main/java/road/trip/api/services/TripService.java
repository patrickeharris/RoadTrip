package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public Trip createTrip (Trip trip) {

        if (trip.getRoute() != null) {
            stopService.addStops(trip.getRoute().getStops());
            Route r = routeRepository.save(trip.getRoute());
        }

        return tripRepository.save(trip);
    }

    public Trip editTrip(Trip trip) {
        Trip t = findTripById(trip.getTrip_id());
        trip.setStartLoc(t.getStartLoc());
        trip.setEndLoc(t.getEndLoc());
        trip.setTrip_id(null);
        trip.getRoute().setRoute_id(null);
        for(Stop s : trip.getRoute().getStops()){
            for(Stop s2 : t.getRoute().getStops()){
                if(s.getStopName().equals(s2.getStopName())){
                    s.setStopLocLong(s2.getStopLocLong());
                    s.setStopLocLat(s2.getStopLocLat());
                    s.setVicinity(s2.getVicinity());
                    s.setStopType(s2.getStopType());
                }
            }
            s.setStop_id(null);
        }
        if(t.getTrip_id() != null) {
            deleteTrip(t.getTrip_id());
        }
        return createTrip(trip);
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
