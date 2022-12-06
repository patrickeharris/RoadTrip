package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Notification;
import road.trip.api.persistence.NotificationRepository;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> findNotifications(){
        return notificationRepository.findAll();
    }

    public Notification addNotification(Notification n){
        System.out.println("Notification: " + n.getNotification());
        return notificationRepository.save(n);
    }
}
