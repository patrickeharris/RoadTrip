package road.trip.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.User;
import road.trip.api.persistence.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Password");
        System.out.println(userRepository.findByEmail(username).getPassword());
        return userRepository.findByEmail(username);
    }
}
