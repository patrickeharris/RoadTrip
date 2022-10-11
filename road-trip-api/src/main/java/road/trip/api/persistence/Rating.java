package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = Rating.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {
    public static final String TABLE_NAME = "RATING";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    Long id;

    @Column
    Long trip_id;

    @Column
    int score;

    @Column
    int stopScore;

    @Column
    String message;
}
