package road.trip.api.persistence;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long playlist_ID;

    @Column(name = "trip_ID")
    private Long trip_ID;

    @Column(name = "playlist_name")
    String playlist_name;

    @Column(name = "playlist_link")
    String playlist_link;
}
