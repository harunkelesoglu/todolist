package com.todo.rest.TodoList.controller;

import com.todo.rest.TodoList.entity.User;
import com.todo.rest.TodoList.repository.UserRepository;
import com.todo.rest.TodoList.util.GenericResponse;
import com.todo.rest.TodoList.util.ResponseUtil;
import com.todo.rest.TodoList.util.contant.ServiceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
public class UserController {

    private GenericResponse response;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("getUser")
    public ResponseEntity<?> getUser(@RequestParam String userId) {

        User user = userRepository.findByUserId(userId);

        if(user != null){
            return new ResponseEntity<>(user,HttpStatus.OK);
        }
        response = ResponseUtil.getInstance().createGenericResponse(false,ServiceMessage.USER_NOT_FOUND);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

/*    public ResponseEntity<?> login() {


    }*/

    @PostMapping("/register")
    public ResponseEntity<?> registration(@RequestBody User user) throws Exception {

        String username = user.getUsername();
        String email = user.getEmail();

        if (isNotExistUser(username, email)) {

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            user.setRegistrationDate(timestamp.getTime());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            response = ResponseUtil.getInstance().createGenericResponse(true, ServiceMessage.USER_REGISTER_SUCCESS);

        } else {

            response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.USER_ALREADY_EXIST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    public boolean isNotExistUser(String username, String email) {

        User isExistUserName = userRepository.findByUsername(username);
        User isExitEmail = userRepository.findByEmail(email);

        if (isExistUserName != null || isExitEmail != null) {
            return false;
        }

        return true;

    }



}
