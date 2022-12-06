package road.trip.api.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.services.NotificationService;
import road.trip.api.services.UserService;

@Log4j2
@RestController
@CrossOrigin(allowCredentials = "true", origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/notifications")
    public @ResponseBody Iterable<String> findNotifications (@RequestParam Long user_id){ return notificationService.findNotifications(user_id);}

}
