package road.trip.api.persistence;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = Track.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Track {

    public static final String TABLE_NAME = "TRACK";

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long track_id;

    @Column
    private String name;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> artists = new ArrayList<>();

    @Column
    private String link;
}
