package road.trip.api.controllers;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Playlist;
import road.trip.api.persistence.Track;
import road.trip.api.services.PlaylistService;
import road.trip.api.services.UserService;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.model_objects.specification.TrackSimplified;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;

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

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://trailblazers.gq:8080/get-spotify-user-code");
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
                .scope("user-read-private, user-read-email, user-top-read")
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

        response.sendRedirect("http://trailblazers.gq/add-playlist");
        return spotifyApi.getAccessToken();
    }

    @GetMapping(value="/playlists-all")
    public @ResponseBody Iterable<Playlist> getAllPlaylistsByUser(@RequestParam Long user_id) {
        System.out.println("here");
        return playlistService.getAllPlaylistsByUser(user_id);
    }

    @PostMapping(value="/add-playlist")
    public Playlist addPlaylistToTrip(@RequestParam Long trip_id, @RequestParam Long playlistID) {
        return playlistService.addPlaylistToTrip(trip_id, playlistID);
    }

    @PostMapping(value="/save-playlist")
    public long savePlaylist(@RequestBody Playlist playlist) {
        return playlistService.savePlaylist(playlist);

    }

    @GetMapping(value="/find-playlist")
    public @ResponseBody Playlist findPlaylist(@RequestParam Long id) {
        return playlistService.findPlaylistById(id);
    }

    @GetMapping(value="/generate-recommendations")
    public TrackSimplified[] generateRecommendations(@RequestParam String genre) {
        final GetRecommendationsRequest getRecommendationsRequest = spotifyApi.getRecommendations()
                .limit(15)
                .seed_genres(genre)
                .build();

        try {
            Recommendations recommendations = getRecommendationsRequest.execute();
            return recommendations.getTracks();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        return new se.michaelthelin.spotify.model_objects.specification.TrackSimplified[0];
    }

    @PostMapping(value="/create-playlist")
    public Long createPlaylist(@RequestParam String name, @RequestParam TrackSimplified[] tracks) {
        return playlistService.createPlaylist(name, tracks);
    }

    @GetMapping(value="/user-playlists")
    public PlaylistSimplified[] getUserTopPlaylists() {

        final GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest =
                spotifyApi.getListOfCurrentUsersPlaylists().build();

        try {

            final Paging<PlaylistSimplified> playlistPaging = getListOfCurrentUsersPlaylistsRequest.execute();
            return playlistPaging.getItems();

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        return new se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified[0];
    }
}
