package road.trip.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import road.trip.api.register.User;
import road.trip.api.register.RegisterService;

public class RegisterEndpoint {

    @Autowired
    private RegisterService regService;

    /*
    @GetMapping("/register/{email}")
    public User findUserByEmail(@PathVariable String email) {

        var user = regService.findUser(email);
        return user.orElse(null);
    }
     */

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return regService.registerUser(user);
    }
}
