package road.trip.api.persistence;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@NoArgsConstructor
@ToString
public class Trip {
    public static final String TABLE_NAME = "Trip";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long trip_id;

    @Column(name = "tripName")
    String tripName;

    @Column(name = "start")
    String start;

    @Column(name = "startLoc")
    String startLoc;

    @Column(name = "end")
    String end;

    @Column(name = "endLoc")
    String endLoc;

    @Column(name = "date")
    String date;

    @Column(name = "tolls")
    String tolls;

    @Column(name = "highways")
    String highways;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "selectedRoute")
    private String selectedRoute;

    @Transient
    private List<Stop> selectedStops = new ArrayList<>();

    @OneToOne
    private Route route;

    /*
    @Column(name = "routePref")
    private Enum routePref;

    @Column(name = "playlistPref")
    private Enum playlistPref;
     */

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getUser_id() {
        return user_id;
    }
}
