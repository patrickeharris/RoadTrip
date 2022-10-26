package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class CurUser extends User {
    public static final String TABLE_NAME = "CurUser";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "curuser_id")
    private Long userID;
}
