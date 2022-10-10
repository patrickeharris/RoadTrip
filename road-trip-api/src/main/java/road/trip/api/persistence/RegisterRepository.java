package road.trip.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RegisterRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
