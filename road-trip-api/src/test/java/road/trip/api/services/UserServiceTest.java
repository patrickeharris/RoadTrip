package road.trip.api.services;
/*
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    User user = new User("Mia", "Gortney", "testing@junit.com", "password");
    User user2 = new User("Mia2", "Gortney", "testing@junit.com", "password");

    @Test
    public void testUpdate() {
        user = userService.register(user);
        user2.setUser_id(user.getUser_id());
        userService.update(user2);
        assertEquals(user2.getFirstName(), userService.findAccountById(user.getUser_id()).getFirstName());
    }

    @Test
    public void testRegister() {
        user = userService.register(user);
        assertEquals(userService.findAccountById(user.getUser_id()), user);
    }

    @Test
    public void testLogin() {

    }

    @Test
    public void testLogout() {

    }

    @Test
    public void testFindAllUsers() {
        assertTrue(userService.findAllUsers().size() > 0);
    }

    @Test
    public void testDeleteAccount() {
        user = userService.register(user);
        int size = userService.findAllUsers().size();
        userService.deleteAccount(user.getUser_id());
        assertTrue(userService.findAllUsers().size() < size);
    }
}

 */
