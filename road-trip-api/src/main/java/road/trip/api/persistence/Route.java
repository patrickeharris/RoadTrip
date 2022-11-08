package road.trip.api.persistence;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = Route.TABLE_NAME)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Route {

    public static final String TABLE_NAME = "Route";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long routeId;

    private String routeName;

    /*private Enum stopPref;*/

    @OneToMany
    private List<Stop> stops = new ArrayList<>();

}
