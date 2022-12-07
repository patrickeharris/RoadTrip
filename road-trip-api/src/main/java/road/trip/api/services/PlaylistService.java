package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;

import java.time.LocalDate;

@Service
public class PlaylistService {

    @Autowired
    UserService userService;

    @Autowired
    TripService tripService;

    @Autowired
    TripRepository tripRepository;

    @Autowired
    NotificationService notificationService;

    public void addPlaylistToTrip(Long trip_id, se.michaelthelin.spotify.model_objects.specification.Playlist playlist) {
        Trip trip = tripService.findTripById(trip_id);
        trip.setPlaylist_id(playlist.getId());
        trip.setPlaylist_link(playlist.getExternalUrls().get("spotify"));

        Notification n = new Notification();
        n.setUser(trip.getUser_id());
        n.setNotification("Your new playlist has been added to " + trip.getTripName() + "!");
        n.setTimestamp(LocalDate.now());
        notificationService.addNotification(n);

        tripRepository.save(trip);
    }
}
