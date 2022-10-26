package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;

import javax.persistence.*;

@Data
@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class CurUser {

    public static final String TABLE_NAME = "CurUser";

    @Column(name = "firstName")
    String firstName;

    @Column(name = "lastName")
    String lastName;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    AuthorizationCodeCredentials spotifyAccountToken;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    private Long user_id;
}
