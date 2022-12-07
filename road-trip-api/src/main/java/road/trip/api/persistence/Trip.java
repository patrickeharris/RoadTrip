package road.trip.api.persistence;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = Trip.TABLE_NAME)
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@ToString
public class Trip {
    public static final String TABLE_NAME = "trip";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long trip_id;

    @NonNull
    @Column(name = "tripName")
    String tripName;

    @NonNull
    @Column(name = "start")
    String start;

    @Column(name = "startLoc")
    String startLoc;

    @NonNull
    @Column(name = "end")
    String end;

    @Column(name = "endLoc")
    String endLoc;

    @NonNull
    @Column(name = "date")
    String date;

    @Column(name = "tolls")
    String tolls;

    @Column(name = "highways")
    String highways;

    @NonNull
    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "selectedRoute")
    private String selectedRoute;

    @Column(name = "playlist_id")
    private String playlist_id;

    @Column(name = "playlist_link")
    private String playlist_link;

    @Transient
    private List<Stop> selectedStops = new ArrayList<>();

    @OneToOne
    private Route route;

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getUser_id() {
        return user_id;
    }
}
