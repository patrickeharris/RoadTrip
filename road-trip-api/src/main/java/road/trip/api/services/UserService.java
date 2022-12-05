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

    public User findAccountByEnabled(Boolean enabled) {
        if (userRepository.findByEnabled(enabled).isEmpty()) {
            return null;
        } else {
            return userRepository.findByEnabled(enabled).get();
        }
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User register(User user) {
        user.setEnabled(false);
        return userRepository.save(user);
    }

    public User update(User user) {
        if(userRepository.existsById(user.getUser_id())) {
            findAccountById(user.getUser_id()).setFirstName(user.getFirstName());
            findAccountById(user.getUser_id()).setLastName(user.getLastName());
            findAccountById(user.getUser_id()).setEmail(user.getEmail());
            return userRepository.save(findAccountById(user.getUser_id()));
        }
        return null;
    }

    public ResponseEntity<?> login(String username, String password) throws Exception {
        try {
            System.out.println("Going in");
            System.out.println(username);
            System.out.println(password);
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            System.out.println("Coming out");
        } catch (BadCredentialsException e) {
            System.out.println("Bad");
            System.out.println(e.getMessage());
            throw new Exception("Incorrect username or password", e);
        } catch (AuthenticationException e){
            System.out.println("Bad2");
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
