package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class User {
    public static final String TABLE_NAME = "User";

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "password_hash")
    String salt;

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

    Boolean enabled = false;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    private Long user_id;

    public User(String firstName, String lastName, String email, String password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(user_id, user.user_id) && Objects.equals(salt, user.salt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, email, password, user_id, salt);
    }
}
