package road.trip.api.register;

import org.springframework.stereotype.Service;
import road.trip.api.register.User;
import road.trip.api.register.RegisterRepository;

import java.util.Optional;

@Service
public class RegisterService {
    private RegisterRepository regRepository;

    /*
    public Optional<road.trip.api.register.User> findUser(String email) {
        return regRepository.findByEmail(email);
    }
    */


    public road.trip.api.register.User registerUser(User user) {
        return regRepository.save(user);
    }
}
