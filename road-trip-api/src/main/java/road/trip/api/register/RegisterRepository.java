package road.trip.api.register;

public interface RegisterRepository {

    public default User save(User user) {


        return user;
    }
}
