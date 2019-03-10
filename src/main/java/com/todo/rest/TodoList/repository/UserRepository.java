package com.todo.rest.TodoList.repository;

import com.todo.rest.TodoList.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    User findByUsername(String username);
    User findByEmail(String email);

    User findByUserId(String userId);
}
