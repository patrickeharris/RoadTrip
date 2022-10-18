package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Playlist;
import road.trip.api.persistence.PlaylistRepository;

@Service
public class PlaylistService {

    @Autowired
    PlaylistRepository playlistRepository;

    public Playlist findPlaylistById(Long id) {
        return playlistRepository.findById(id).get();
    }

    /*
    public void spotifyLogin() {

    }

    public getSpotifyUserCode() {

    }
     */
}
