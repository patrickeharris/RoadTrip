package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Notification;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class NotificationServiceTest {

    @Autowired
    NotificationService notificationService;

    @Test
    void testFindNotifications() {
        assertDoesNotThrow(() -> {
            assertNotNull(notificationService.findNotifications());
        });
    }

    @Test
    void testAddNotification_Valid() {
        Notification n = new Notification(null, 1L, "Test notification!", "2022-12-20", LocalDate.now());
        assertDoesNotThrow(() -> {
            Notification added = notificationService.addNotification(n);
            assertThat(added).isNotNull();
        });
    }

    @Test
    void testRemoveNotification() {
        Notification n = new Notification(null, 1L, "Test notification!", "2022-12-20", LocalDate.now());
        Notification result = notificationService.addNotification(n);
        assertDoesNotThrow(() -> {
            notificationService.removeNotification(result.getNotif_id());
        });
    }
}
