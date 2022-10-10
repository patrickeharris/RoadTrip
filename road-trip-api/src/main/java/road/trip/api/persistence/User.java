package road.trip.api.persistence;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = User.TABLE_NAME)
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

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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
}
