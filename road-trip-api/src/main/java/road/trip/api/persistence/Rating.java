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
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "RATING_ID")
    Long id;

    @Column(name = "SCORE")
    int score;

    @Column(name = "MESSAGE")
    String message;

    @Column(name = "TYPE")
    String type;
}
