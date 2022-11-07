package road.trip.api.persistence;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = Stop.TABLE_NAME)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stop {

    public static final String TABLE_NAME = "Stop";

    @Id
    @Column(name = "stop_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "trip_id")
    private Long trip_id;

    @Column(name = "stop_name")
    private String name;

    @Column(name = "stop_location")
    private String location;
}
