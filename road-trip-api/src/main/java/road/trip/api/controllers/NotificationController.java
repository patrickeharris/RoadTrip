package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.persistence.Notification;
import road.trip.api.services.NotificationService;
import road.trip.api.services.UserService;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get/notifications")
    public @ResponseBody Iterable<Notification> findNotifications (){
        return notificationService.findNotifications();
    }

    @PostMapping("/add/notification")
    public Notification addNotification(@RequestBody Notification n){
        return notificationService.addNotification(n);
    }

    @DeleteMapping("/remove/notification")
    public void removeNotification(@RequestParam Long notif_id){
        System.out.println("-------------------------------id" + notif_id);
        notificationService.removeNotification(notif_id);
    }
}
