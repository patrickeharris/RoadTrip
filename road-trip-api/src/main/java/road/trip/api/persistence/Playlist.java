package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private Long playlist_id;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "playlistName")
    private String playlistName;

    @Column
    @OneToMany(fetch=FetchType.EAGER)
    private List<Track> trackList = new ArrayList<>();
}
