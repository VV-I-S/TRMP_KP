package ru.borisova.boostingservice.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Service;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.repository.ServiceRepository;
import ru.borisova.boostingservice.repository.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TransactionalService {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createNewServiceForTest1(){
        serviceRepository.save(new Service("test1",100,10));

        return "test_complete";
    }
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createNewUserForTest1(){
        userRepository.save(new User("admin","admin@admin.com","+79290875508","1234"));

        return "test_complete";
    }

    @Transactional
    public String createNewServiceForTest2(){
        serviceRepository.save(new Service("test2",100,10));

        return "test_complete";
    }
    @Transactional
    public String createNewUserForTest2(){
        userRepository.save(new User("admin2","admin2@admin.com","+79290875508","1234"));

        return "test_complete";
    }

}
