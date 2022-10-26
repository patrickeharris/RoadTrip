package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.CurUser;
import road.trip.api.persistence.User;
import road.trip.api.services.CurUserService;
import road.trip.api.services.UserService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CurUserService curUserService;

    @GetMapping("/register/users")
    public @ResponseBody Iterable<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/register/curUser")
    public CurUser findCurUser() {
        return curUserService.findCurUser();
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
    public CurUser login(@RequestBody String email, String password) {
        CurUser user = new CurUser();
        user.setEmail(email);
        return curUserService.login(user);
    }

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