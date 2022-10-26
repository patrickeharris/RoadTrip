package road.trip.api.services;

import org.springframework.stereotype.Service;
import road.trip.api.persistence.CurUser;
import road.trip.api.persistence.CurUserRepository;

import java.util.List;

@Service
public class CurUserService {

    CurUserRepository curUserRepository;

    public CurUser login(CurUser user) {
        CurUser newUser = findAccountByEmail(user.getEmail());
        return curUserRepository.save(newUser);
    }

    public CurUser findAccountByEmail(String email) {
        return curUserRepository.findByEmail(email);
    }

    public CurUser findCurUser(){
        List<CurUser> list = curUserRepository.findAll();
        return list.get(0);
    }
}
