package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.UserRepository;
import road.trip.api.persistence.User;
import road.trip.api.security.JwtUtil;
import road.trip.api.security.MyUserDetailsService;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    public User findAccountById(Long id) {
        return userRepository.findById(id).get();
    }

    public User findAccountByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public User update(String firstName, String lastName, String email, Long userID) {

        if (userRepository.existsById(userID)) {

            User user = findAccountById(userID);

            if (!Objects.equals(firstName, "")) {
                user.setFirstName(firstName);
            }

            if (!Objects.equals(lastName, "")) {
                user.setLastName(lastName);
            }

            if (!Objects.equals(email, "")) {
                user.setEmail(email);
            }

            return userRepository.save(user);
        }
        return null;
    }

    public ResponseEntity<?> login(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            System.out.println(e.getMessage());
            throw new Exception("Incorrect username or password", e);
        } catch (AuthenticationException e){
            System.out.println(e.getMessage());
        }

        final User user = myUserDetailsService.loadUserByUsername(username);

        final String jwt = jwtTokenUtil.generateToken(user);
        System.out.println(jwt);
        return ResponseEntity.ok(jwt);
    }

    public User findCurUser(String auth) {
        auth = auth.replace("Bearer ", "");
        String email = jwtTokenUtil.extractEmail(auth);
        return findAccountByEmail(email);
    }

    public User deleteAccount(Long user_id) {
        User user = findAccountById(user_id);
        userRepository.delete(user);
        return user;
    }
}
