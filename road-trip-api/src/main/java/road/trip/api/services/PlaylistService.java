package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.TrackSimplified;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Autowired
    TrackRepository trackRepository;

    @Autowired
    NotificationService notificationService;

    public Playlist findPlaylistById(Long id) {
        return playlistRepository.findById(id).get();
    }

    public Long createPlaylist(String name, TrackSimplified[] tracks) {
        Playlist playlist = new Playlist();
        playlist.setPlaylistName(name);
        List<Track> trackList = new ArrayList<>();
        for (TrackSimplified track : tracks) {
            Track t = new Track();
            t.setName(track.getName());
            List<String> artists = new ArrayList<>();
            for (ArtistSimplified artist : track.getArtists()) {
                artists.add(artist.getName());
            }
            t.setArtists(artists);
            t.setLink(track.getExternalUrls().get("spotify"));
            t = trackRepository.save(t);
            trackList.add(t);
        }
        playlist.setTrackList(trackList);
        playlist = playlistRepository.save(playlist);
        return playlist.getPlaylist_id();
    }


    public long savePlaylist(Playlist playlist) {
        Playlist playlist1 = playlistRepository.save(playlist);
        return playlist1.getPlaylist_id();
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
