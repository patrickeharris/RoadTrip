package road.trip.api.controllers;

import org.junit.jupiter.api.Test;
import road.trip.api.persistence.RegisterRepository;
import road.trip.api.persistence.User;
import road.trip.api.services.UserService;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * This tests the RegisterController class
 */
public class RegisterControllerTest {
    /**
     * This is the RegisterController used in the below tests
     */
    public UserService r = new UserService();

    /**
     * This tests if findAllUsers returns a list of users
     */
    @Test
    public void testFindAllUsers_success(){
        Iterable<User> users = r.findAllUsers();
        assert(users!=null);
    }

    /**
     * This tests that registerUser inputs the user into the database
     */
    @Test
    public void registerUser_success(){
        User u = new User("ack", "ale", "ack@ale.com", "pw");
        r.register(u);
        Iterable<User> users = r.findAllUsers();
        for(User q : users){
            if(q.equals(u)){
                assert(true);
            }
        }
        assert(false);
    }

    /**
     * This tests a successful user update
     */
    @Test
    public void updateUser_success(){
        User u = new User("x", "y", "z@z.com", "p");
        r.register(u);
        u.setFirstName("w");
        r.update(u);
        Iterable<User> users = r.findAllUsers();
        for(User q : users){
            if(q.equals(u)){
                assert(true);
            }
        }
        assert(false);
    }

    /**
     * This tests a successful user login
     */
    @Test
    public void loginUser_success(){
        User u = new User("a", "b", "c@c.com", "p");
        r.register(u);
        User two = r.login(u.getEmail());
        assertEquals(u, two);
    }
}
