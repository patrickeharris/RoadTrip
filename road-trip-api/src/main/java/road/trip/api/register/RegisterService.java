package road.trip.api.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.sql.*;

import java.util.List;
import java.util.Optional;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepository regRepository;

    /*
    public Optional<road.trip.api.register.User> findUser(String email) {
        return regRepository.findByEmail(email);
    }
    */

    public List<User> getUsers(){
        return regRepository.findAll();
    }


    public User registerUser (User user) {
        System.out.println(user.getEmail());
        return regRepository.save(user);
    }
}
