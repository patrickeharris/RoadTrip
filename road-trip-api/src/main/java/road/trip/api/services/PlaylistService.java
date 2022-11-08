package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Playlist;
import road.trip.api.persistence.PlaylistRepository;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.TripRepository;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class PlaylistService {

    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    UserService userService;

    @Autowired
    TripService tripService;

    @Autowired
    TripRepository tripRepository;

    public Playlist findPlaylistById(Long id) {
        return playlistRepository.findById(id).get();
    }

    public long savePlaylist(Playlist playlist) {
        Playlist playlist1 = playlistRepository.save(playlist);
        return playlist1.getPlaylistID();
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public List<Playlist> getAllPlaylistsByUser(Long user_id) {
        List<Playlist> list = playlistRepository.findAll();
        List<Playlist> newList = new ArrayList<>();

        for (Playlist playlist : list) {
            if (Objects.equals(playlist.getUser_id(), user_id)) {
                newList.add(playlist);
            }
        }
        return newList;
    }

    public Playlist addPlaylist(Long trip_id, Long playlistID) {
        Trip trip = tripService.findTripById(trip_id);
        Playlist playlist = findPlaylistById(playlistID);
        trip.setPlaylist_id(playlistID);
        tripRepository.save(trip);
        return playlist;
    }
}
