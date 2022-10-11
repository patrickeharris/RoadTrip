package road.trip.api.persistence;

import lombok.*;

import javax.persistence.*;

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

    @Column(name = "userID")
    private Long user_id;

    @Column(name = "selectedRoute")
    private String selectedRoute;

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getUser_id() {
        return user_id;
    }
}
