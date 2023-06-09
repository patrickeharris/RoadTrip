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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long stop_id;

    private String stopName;

    private String vicinity;

    private Double stopLocLat;

    private Double stopLocLong;

    private String stopType;
}
