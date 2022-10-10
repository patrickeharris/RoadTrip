package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.RegisterRepository;
import road.trip.api.persistence.User;

import java.util.List;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepository regRepository;

    /*
    public Optional<road.trip.api.domain.User> findUser(String email) {
        return regRepository.findByEmail(email);
    }
    */

    public List<User> getUsers() {
        return regRepository.findAll();
    }

    public User registerUser(User user) {
        return regRepository.save(user);
    }

    public User updateUser(String firstName, String lastName, String email, Long id) {
        User u = regRepository.findById(id).get();
        u.setFirstName(firstName);
        u.setLastName(lastName);
        u.setEmail(email);
        return regRepository.save(u);
    }

    public User loginUser(User user) {
        return regRepository.save(user);
    }
}