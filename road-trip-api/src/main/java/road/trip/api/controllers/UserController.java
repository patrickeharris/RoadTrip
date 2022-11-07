package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/register/curUser")
    public User findCurUser() {
        return userService.findCurUser();
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/register/update")
    public User update(@RequestBody User u) {
        return userService.update(u);
    }

    @PostMapping("/login")
    public User login(@RequestParam String email) {
        return userService.login(email);
    }

    @PostMapping("/register/remove")
    public User remove(@RequestBody Long id){ return userService.remove(id); }

    /*

    public void logout() {

    }

    @DeleteMapping("/profile/delete")
    public User deleteAccount(Long user_id) {

    }

    public void connectSpotifyAccount() {

    }
     */
}