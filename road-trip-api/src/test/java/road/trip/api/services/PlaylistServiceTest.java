package road.trip.api.services;

/*
import road.trip.api.persistence.Trip;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.GeneralSecurityException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class PlaylistServiceTest {

    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    PlaylistService playlistService;

    @Autowired
    TripService tripService;

    Playlist playlist = new Playlist(15L, 12L,
            "testPlaylist", null);

    Trip trip = new Trip(12L, "Test Trip", "Houston", "Houston", "Fort Worth",
            "Fort Worth", "11/8/2022", "Y", "Y", 1L, "route",
            null, null, null);

    @Test
    public void testSavePlaylist() {
        int size = playlistRepository.findAll().size();
        playlistService.savePlaylist(playlist);
        assertTrue(playlistRepository.findAll().size() > size);
    }

    @Test
    public void testGetAllPlaylists() {
        playlistService.savePlaylist(playlist);
        assertTrue(playlistService.getAllPlaylists().size() > 0);
    }

    @Test
    public void testAddPlaylist() throws MessagingException, GeneralSecurityException, IOException {
        trip = tripService.createTrip(trip);
        long playlistId = playlistService.savePlaylist(playlist);
        playlistService.addPlaylistToTrip(trip.getTrip_id(), playlistId);
        trip = tripService.findTripById(trip.getTrip_id());
        assertEquals(playlistId, (long) trip.getPlaylist_id());
    }

    @Test
    public void testGetAllPlaylistsByUser() {
        assertTrue(playlistService.getAllPlaylistsByUser(playlist.getUser_id()).size() > 0);
    }
}
}

 */
