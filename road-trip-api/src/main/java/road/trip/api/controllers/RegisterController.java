package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.User;
import road.trip.api.services.RegisterService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class RegisterController {

    @Autowired
    private RegisterService regService;

    /*
    @GetMapping("/register/{email}")
    public User findUserByEmail(@PathVariable String email) {

        var user = regService.findUser(email);
        return user.orElse(null);
    }
     */

    @GetMapping("/register/users")
    public @ResponseBody Iterable<User> findAllUsers() {
        return regService.getUsers();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return regService.registerUser(user);
    }
}
