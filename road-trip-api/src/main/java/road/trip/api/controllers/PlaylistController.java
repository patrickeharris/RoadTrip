package road.trip.api.controllers;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Playlist;
import road.trip.api.services.PlaylistService;
import road.trip.api.services.UserService;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.personalization.simplified.GetUsersTopArtistsRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;

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
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("spotify-login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read")
                .show_dialog(true)
                .build();

        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }

    @GetMapping(value = "get-spotify-user-code")
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

        final GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest =
                spotifyApi.getListOfCurrentUsersPlaylists().build();

        try {

            final Paging<PlaylistSimplified> playlistPaging = getListOfCurrentUsersPlaylistsRequest.execute();
            for (int i = 0; i < playlistPaging.getItems().length; i++) {
                System.out.println(playlistPaging.getItems()[i].getName());
                playlistService.store(playlistPaging.getItems()[i]);
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        response.sendRedirect("http://trailblazers.gq/");
        return spotifyApi.getAccessToken();
    }

    @GetMapping(value="playlists-all")
    public Iterable<Playlist> getAllPlaylistsByUser(@RequestParam Long user_id) {
        return playlistService.getAllPlaylistsByUser(user_id);
    }

    @PostMapping(value="add-playlist")
    public Playlist addPlaylist(@RequestParam Long trip_id, @RequestParam Long playlistID) {
        return playlistService.addPlaylist(trip_id, playlistID);
    }

    /*
    @GetMapping(value="user-playlists")
    public PlaylistSimplified[] getUserTopArtists() {

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

     */
}
