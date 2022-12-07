package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.User;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    @Transactional
    void testRegister() {
        User testUser = new User("John", "Smith", "jsmith", "test123");
        User result = userService.register(testUser);

        assertThat(result).isNotNull();
    }

    @Test
    @Transactional
    void testFindAllUsers() {
        List<User> users = userService.findAllUsers();

        assertThat(users).isNotNull();
    }

//    @Test
//    void testUpdate() {
//        User testUser = new User("John", "Smith", "jsmith", "test123");
//        User result = userService.register(testUser);
//
//        result.setFirstName("Bob");
//
//        userService.update(result);
//        User result2 = userService.findAccountById(result.getUser_id());
//
//        assertThat(result2.getFirstName()).isEqualTo("Bob");
//    }

//    @Test
//    @Transactional
//    void testLogin() throws Exception {
//        User testUser = new User("John", "Smith", "jsmith@gmail.com", "test123");
//        userService.register(testUser);
//
//        assertDoesNotThrow(() -> {
//            userService.login("jsmith@gmail.com", "test123");
//        });
//    }

    @Test
    void testDeleteAccount() {
        User testUser = new User("John", "Smith", "jsmith@gmail.com", "test123");
        User result = userService.register(testUser);

        assertDoesNotThrow(() -> {
            User result2 = userService.deleteAccount(result.getUser_id());

            assertThat(result2).isNotNull();
        });
    }
}
