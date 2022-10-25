package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.CurUser;
import road.trip.api.persistence.CurUserRepository;
import road.trip.api.persistence.UserRepository;
import road.trip.api.persistence.User;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CurUserRepository curUserRepository;

    public User findAccountById(Long id) {
        return userRepository.findByUserID(id).get();
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

    public User update(User user) {
        if(userRepository.existsById(user.getUser_id())) {
            findAccountById(user.getUser_id()).setFirstName(user.getFirstName());
            findAccountById(user.getUser_id()).setLastName(user.getLastName());
            findAccountById(user.getUser_id()).setEmail(user.getEmail());
            return userRepository.save(findAccountById(user.getUser_id()));
        }
        return null;
    }

    public CurUser login(CurUser user) {
        CurUser newUser = (CurUser) findAccountByEmail(user.getEmail());
        return curUserRepository.save(newUser);
    }

    public CurUser findCurUser(){
        List<CurUser> list = curUserRepository.findAll();
        return list.get(0);
    }
    /*
    public void logout() {

    }

    public User deleteAccount() {

    }

    public void generateToken() {

    }
     */


}