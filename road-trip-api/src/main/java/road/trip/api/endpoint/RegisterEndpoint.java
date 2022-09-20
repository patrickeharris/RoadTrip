package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.register.User;
import road.trip.api.register.RegisterService;

@Log4j2
@RestController
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
