package road.trip.api.services;

import org.apache.hc.core5.http.ParseException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Route;
import road.trip.api.persistence.Trip;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.requests.data.playlists.CreatePlaylistRequest;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class PlaylistServiceTest {

    @Autowired
    PlaylistService playlistService;

    @Autowired
    TripService tripService;

//    @Test
//    @Transactional
//    void testAddPlaylistToTrip() throws MessagingException, GeneralSecurityException, IOException, ParseException, SpotifyWebApiException {
//        Trip testTrip = new Trip(null, "Test trip", "Houston, TX, USA", "29.7604267 -95.3698028", "Waco, TX, USA", "31.549333 -97.1466695", "2022-10-20", "true", "true", 1L, "Hwy 6 N", "3aKfOYLX8JGFThGWieixXD", "https://open.spotify.com/playlist/3aKfOYLX8JGFThGWieixXD", new ArrayList<>(), new Route(null, "Test route", new ArrayList<>()));
//        Trip result = tripService.createTrip(testTrip);
//
//        final String accessToken = "taHZ2SdB-bPA3FsK3D7ZN5npZS47cMy-IEySVEGttOhXmqaVAIo0ESvTCLjLBifhHOHOIuhFUKPW1WMDP7w6dj3MAZdWT8CLI2MkZaXbYLTeoDvXesf2eeiLYPBGdx8tIwQJKgV8XdnzH_DONk";
//        final String userId = "abbaspotify";
//        final String name = "Abba";
//
//        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
//                .setAccessToken(accessToken)
//                .build();
//
//        final CreatePlaylistRequest createPlaylistRequest = spotifyApi.createPlaylist(userId, name).build();
//        Playlist playlist = createPlaylistRequest.execute();
//
//        assertDoesNotThrow(() -> {
//            playlistService.addPlaylistToTrip(result.getTrip_id(), playlist);
//        });
//
//        tripService.deleteTrip(result.getTrip_id());
//    }
}
