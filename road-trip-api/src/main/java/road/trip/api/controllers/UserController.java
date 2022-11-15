package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.User;
import road.trip.api.security.JwtUtil;
import road.trip.api.security.MyUserDetailsService;
import road.trip.api.services.UserService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestParam String username, @RequestParam String password) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(jwt);
    }


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
    public User remove(@RequestBody Long id) {
        return userService.remove(id);
    }

    @GetMapping("/logout")
    public User logout() {
        return userService.logout();
    }

    @DeleteMapping("/profile/delete")
    public User deleteAccount(Long user_id) {
        return userService.deleteAccount(user_id);
    }
}