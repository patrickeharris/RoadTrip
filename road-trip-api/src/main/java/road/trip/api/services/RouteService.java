package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Route;
import road.trip.api.persistence.RouteRepository;
import road.trip.api.persistence.Stop;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    RouteRepository routeRepository;

    public Route findRouteById(Long id) {
        return routeRepository.findById(id).get();
    }

    /*
    public void chooseStop() {

    }

    public List<Stop> getRecommendedStops(Long routeId) {

    }

    public Route createRoute() {

    }

    public void getRouteInfo() {

    }
     */
}
