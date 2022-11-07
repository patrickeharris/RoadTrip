package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Playlist;
import road.trip.api.persistence.PlaylistRepository;
import road.trip.api.persistence.Trip;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;

import java.util.Collections;
import java.util.List;

@Service
public class PlaylistService {

    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    UserService userService;

    @Autowired
    TripService tripService;

    public Playlist findPlaylistById(Long id) {
        return playlistRepository.findById(id).get();
    }

    public void store(PlaylistSimplified playlist) {
        Playlist newPlaylist = new Playlist();
        newPlaylist.setPlaylistName(playlist.getName());
        newPlaylist.setPlaylistLink(playlist.getExternalUrls().get("spotify"));
        newPlaylist.setImageLink(playlist.getImages()[0].getUrl());
        newPlaylist.setUser_id(userService.findCurUser().getUser_id());
        playlistRepository.save(newPlaylist);
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public List<Playlist> getAllPlaylistsByUser(Long user_id) {
        return playlistRepository.findAllById(Collections.singleton(user_id));
    }

    public Playlist addPlaylist(Long trip_id, Long playlistID) {
        Trip trip = tripService.findTripById(trip_id);
        Playlist playlist = findPlaylistById(playlistID);
        trip.setPlaylist_id(playlistID);
        return playlist;
    }

    /*
    public void spotifyLogin() {

    }

    public getSpotifyUserCode() {

    }
     */
}
