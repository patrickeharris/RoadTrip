package road.trip.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurUserRepository extends JpaRepository<CurUser, Long> {
    CurUser findByEmail(String email);
}
