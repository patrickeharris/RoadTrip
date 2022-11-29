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
@Table(name = Track.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Track {

    public static final String TABLE_NAME = "TRACK";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long track_id;

    private String name;

    private List<String> artists = new ArrayList<>();

    private String link;
}
