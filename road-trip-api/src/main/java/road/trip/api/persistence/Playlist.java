package road.trip.api.persistence;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long playlistID;

    @Column(name = "trip_ID")
    private Long trip_ID;

    @Column(name = "playlistName")
    String playlistName;

    @Column(name = "playlistLink")
    String playlistLink;
}
