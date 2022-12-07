package road.trip.api.controllers;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.TripRepository;
import road.trip.api.services.PlaylistService;
import road.trip.api.services.TripService;
import road.trip.api.services.UserService;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;
import se.michaelthelin.spotify.requests.data.playlists.AddItemsToPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.CreatePlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistRequest;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

enum Keys {
    CLIENT_ID,
    CLIENT_SECRET;


    public String getKey() {
        if (this == CLIENT_ID) {
            return "77d2010773634ac9b41b7633c77fa067";
        } else {
            return "174fbe9716434f86aa0d7e4f78392016";
        }
    }
}

@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class PlaylistController {

    @Autowired
    PlaylistService playlistService;

    @Autowired
    TripService tripService;

    @Autowired
    TripRepository tripRepository;

    private static final URI redirectUri = SpotifyHttpManager.makeUri("https://trailblazers.gq:8080/get-spotify-user-code");
    private String code = "";
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(Keys.CLIENT_ID.getKey())
            .setClientSecret(Keys.CLIENT_SECRET.getKey())
            .setRedirectUri(redirectUri)
            .build();

    UserService userService;

    @GetMapping("/spotify-login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read, playlist-modify-public")
                .show_dialog(true)
                .build();

        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }

    @GetMapping(value = "/get-spotify-user-code")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response)
            throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();

        try {

            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        response.sendRedirect("http://trailblazers.gq/generate-playlist");
        return spotifyApi.getAccessToken();
    }

    @DeleteMapping(value="/delete-playlist")
    public void deletePlaylist(@RequestParam Long trip_id) {
        Trip trip = tripService.findTripById(trip_id);
        trip.setPlaylist_link(null);
        trip.setPlaylist_id(null);
        tripRepository.save(trip);
    }

    @GetMapping(value="/generate-recommendations")
    public String generateRecommendations(@RequestParam Long trip_id, @RequestParam String genre, @RequestParam String playlistName) {
        final GetRecommendationsRequest getRecommendationsRequest = spotifyApi.getRecommendations()
                .limit(15)
                .seed_genres(genre)
                .build();

        final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile().build();

        final CreatePlaylistRequest createPlaylistRequest;

        final AddItemsToPlaylistRequest addItemsToPlaylistRequest;

        final GetPlaylistRequest getPlaylistRequest;

        try {
            Recommendations recommendations = getRecommendationsRequest.execute();
            String id = getCurrentUsersProfileRequest.execute().getId();

            System.out.println(id);

            createPlaylistRequest = spotifyApi.createPlaylist(id,playlistName).build();
            se.michaelthelin.spotify.model_objects.specification.Playlist playlist = createPlaylistRequest.execute();

            String[] uris = new String[15];
            for (int i = 0; i < 15; i++) {
                uris[i] = recommendations.getTracks()[i].getUri();
                System.out.println(recommendations.getTracks()[i].getUri());
            }
            addItemsToPlaylistRequest = spotifyApi.addItemsToPlaylist(playlist.getId(),uris).build();
            addItemsToPlaylistRequest.execute();

            getPlaylistRequest = spotifyApi.getPlaylist(playlist.getId()).build();
            playlist = getPlaylistRequest.execute();

            playlistService.addPlaylistToTrip(trip_id, playlist);

            return playlist.getExternalUrls().get("spotify");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        return null;
    }

    @GetMapping("/get-playlist-link")
    public String getPlaylistLink(@RequestParam Long trip_id) {
        Trip trip = tripService.findTripById(trip_id);
        return trip.getPlaylist_link();
    }
}
