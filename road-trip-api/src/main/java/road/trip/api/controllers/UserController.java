package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.User;
import road.trip.api.services.UserService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/register/users")
    public @ResponseBody Iterable<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/findUser")
    public User findAllUsers(@RequestParam String email) {
        return userService.findAccountByEmail(email);
    }

    @GetMapping("/register/curUser")
    public User findCurUser(@RequestHeader(value="authorization") String auth) {
        return userService.findCurUser(auth);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/register/update")
    public User update(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam Long userID) {
        return userService.update(firstName, lastName, email, userID);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) throws Exception {
        return userService.login(email, password);
    }

    @DeleteMapping("/profile/delete")
    public User deleteAccount(@RequestParam Long user_id) {
        return userService.deleteAccount(user_id);
    }
}