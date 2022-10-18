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
    private Long stopId;

    private String stopName;

    private Double stopLoc;

    private Enum stopType;
}
