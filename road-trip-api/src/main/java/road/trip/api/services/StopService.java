package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Stop;
import road.trip.api.persistence.StopRepository;

@Service
public class StopService {

    @Autowired
    StopRepository stopRepository;

    public Stop findStopById(Long id) {
        return stopRepository.findById(id).get();
    }

    /*
    public Stop findStopByLoc(Double loc) {
        return stopRepository.findByLoc(loc).get();
    }

    public void getStopInfo() {

    }

    public void createStop() {

    }
     */
}
