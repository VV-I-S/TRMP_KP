package ru.borisova.boostingservice.controllers;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.service.TransactionalService;
import ru.borisova.boostingservice.service.UserService;
import java.util.List;

@RestController
@RequestMapping("api/tran")
@AllArgsConstructor
public class TestController {

    private final TransactionalService transactionalService;
    private final UserService userService;
    @GetMapping("blockUser")
    public User blockUserByEmail(@RequestParam String email) {
        return userService.changeRoleUserByEmail(email, "block");
    }
    @Transactional
    @GetMapping("test")
    public String test() {
        return "123";
    }
    @GetMapping("test1")
    public String pass1pass2() {

        String str = transactionalService.createNewServiceForTest1();
        transactionalService.createNewUserForTest1();
        if (str != null) throw new RuntimeException();

        return "test1";
    }

    @Transactional
    @GetMapping("test2")
    public String fail1fail2() {

        String str = transactionalService.createNewServiceForTest2();
        transactionalService.createNewUserForTest2();
        if (str != null) throw new RuntimeException();

        return "test2";
    }

    @Transactional
    @GetMapping("test3")
    public String pass1fail2() {

        String str = transactionalService.createNewServiceForTest1();
        transactionalService.createNewUserForTest2();
        if (str != null) throw new RuntimeException();

        return "test3";
    }

    @Transactional
    @GetMapping("test4")
    public String pass2fail1() {

        String str = transactionalService.createNewServiceForTest2();
        transactionalService.createNewUserForTest1();
        if (str != null) throw new RuntimeException();

        return "test4";
    }

}
