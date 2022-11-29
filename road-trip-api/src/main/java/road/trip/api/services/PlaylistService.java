package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.*;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.model_objects.specification.TrackSimplified;

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

    @Autowired
    TrackRepository trackRepository;

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

    public Playlist addPlaylistToTrip(Long trip_id, Long playlistID) {
        Trip trip = tripService.findTripById(trip_id);
        Playlist playlist = findPlaylistById(playlistID);
        trip.setPlaylist_id(playlistID);
        tripRepository.save(trip);
        return playlist;
    }
}
