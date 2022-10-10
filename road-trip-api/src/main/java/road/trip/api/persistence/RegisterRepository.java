package road.trip.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RegisterRepository extends JpaRepository<User, Long> {
<<<<<<< HEAD
    public User findByEmail(String email);
=======
>>>>>>> a85de1b16e87dca0e0402e482a2951ff2805fe97
}
