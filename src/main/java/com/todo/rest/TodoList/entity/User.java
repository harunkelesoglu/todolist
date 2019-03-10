package com.todo.rest.TodoList.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Document(collection="users")
@Data
public class User implements Serializable {

    @Id
    private String userId;

    private String username;

    private String email;

    private String password;

    private String name;

    private String surname;

    @DBRef
    private ArrayList<TodoList> todoLists;

    private Long registrationDate;


}
