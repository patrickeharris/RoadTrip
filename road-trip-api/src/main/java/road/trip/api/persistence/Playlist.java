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

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "playlistName")
    String playlistName;

    @Column(name = "playlistLink")
    String playlistLink;

    @Column(name = "imageLink")
    String imageLink;
}
