package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class User {
    public static final String TABLE_NAME = "User";

    @Column(name = "firstName")
    String firstName;

    @Column(name = "lastName")
    String lastName;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    /*

    @Column(name = "regDate")
    Date regDate;

    @Column(name = "lastLogin")
    Date lastLogin;

    @Column(name = "isOperator")
    Boolean isOperator;

    @Column(name = "emailPref")
    Boolean emailPref;

     */

    AuthorizationCodeCredentials spotifyAccountToken;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    private Long userID;

    public User(String firstName, String lastName, String email, String password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public void setUser_id(Long user_id) {
        this.userID = user_id;
    }

    public Long getUser_id() {
        return userID;
    }
}
