package road.trip.api.register;

import org.springframework.stereotype.Service;
import road.trip.api.register.User;
import road.trip.api.register.RegisterRepository;

import java.sql.*;

import java.util.Optional;

@Service
public class RegisterService {
    private RegisterRepository regRepository;

    /*
    public Optional<road.trip.api.register.User> findUser(String email) {
        return regRepository.findByEmail(email);
    }
    */


    public User registerUser (User user) {
        String sql = "INSERT INTO User (firstName, lastName, email, password) VALUES (user.firstName, " +
                "user.lastName, user.email, user.password)";
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/");
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}
