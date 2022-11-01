package road.trip.api.controllers;

import org.springframework.web.bind.annotation.*;
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
@RequestMapping("spotify")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PlaylistController {

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://trailblazers.gq:8080/spotify/get-user-code");
    private String code = "";
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(Keys.CLIENT_ID.getKey())
            .setClientSecret(Keys.CLIENT_SECRET.getKey())
            .setRedirectUri(redirectUri)
            .build();

    UserService userService;

    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read")
                .show_dialog(true)
                .build();

        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }

    @GetMapping(value = "get-user-code")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response)
            throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();

        try {

            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            /*
                if (user.spotifyAccountToken == NULL) {

                   final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
                   userService.findCurUser().setSpotifyAccountToken(authorizationCodeCredentials);

                } else {
                    if (user.spotifyAccountToken.getExpiresIn() > now()) {
                        final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
                        userService.findCurUser().setSpotifyAccountToken(authorizationCodeCredentials);
                    }
                }


            spotifyApi.setAccessToken(spotifyAccountToken.getAccessToken());
            spotifyApi.setRefreshToken(spotifyAccountToken.getRefreshToken());

            System.out.println("Expires in: " + spotifyAccountToken.getExpiresIn());

             */

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());

        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        response.sendRedirect("http://trailblazers.gq/top-playlists");
        return spotifyApi.getAccessToken();
    }

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

        /*

        final GetUsersTopArtistsRequest getUsersTopArtistsRequest = spotifyApi.getUsersTopArtists()
                .time_range("medium_term")
                .limit(10)
                .offset(5)
                .build();

        try {
            final Paging<Artist> artistPaging = getUsersTopArtistsRequest.execute();
            return artistPaging.getItems();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        */

        return new se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified[0];
    }
}
