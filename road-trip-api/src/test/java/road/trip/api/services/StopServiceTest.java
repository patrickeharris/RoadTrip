package road.trip.api.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.persistence.Stop;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class StopServiceTest {

    @Autowired
    StopService stopService;

    @Autowired
    TripService tripService;

    @Test
    @Transactional
    void testGetRecommendedStops() {
        stopService.getRecommendedStops(381);
    }

    @Test
    @Transactional
    void testAddStops() throws MessagingException, GeneralSecurityException, IOException {

        Stop stop1 = new Stop(null, "Test gas station 1", "2187 Airport Boulevard, Pensacola", 30.4745748, -87.2002164, "Stop");
        Stop stop2 = new Stop(null, "Test gas station 1", "2187 Airport Boulevard, Pensacola", 30.4745748, -87.2002164, "Stop");
        Stop stop3 = new Stop(null, "Test gas station 1", "2187 Airport Boulevard, Pensacola", 30.4745748, -87.2002164, "Stop");

        List<Stop> stops = new ArrayList<>();
        stops.add(stop1);
        stops.add(stop2);
        stops.add(stop3);



        assertDoesNotThrow(() -> {
            stopService.addStops(stops);
        });
    }

    @Test
    @Transactional
    void testFindStopById() {
        Stop stop1 = new Stop(null, "Test gas station 1", "2187 Airport Boulevard, Pensacola", 30.4745748, -87.2002164, "Stop");
        List<Stop> stops = new ArrayList<>();
        stops.add(stop1);

        Stop result = stopService.findStopById(489L);

        assertThat(result).isNotNull();
        assertThat(result.getStop_id()).isEqualTo(489L);
    }
}
