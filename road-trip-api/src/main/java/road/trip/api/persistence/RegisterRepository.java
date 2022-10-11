package road.trip.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRepository extends JpaRepository<User, Long> {
    //Optional<User> findByUser_id(Long id);
    Optional<User> findById(Long user_id);
    public User findByEmail(String email);
}
