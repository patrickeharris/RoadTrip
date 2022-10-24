package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = Playlist.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Playlist {
    public static final String TABLE_NAME = "PLAYLIST";

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
