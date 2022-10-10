package road.trip.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import road.trip.api.persistence.User;

@Repository
public interface RegisterRepository extends JpaRepository<User, Long> {

}
