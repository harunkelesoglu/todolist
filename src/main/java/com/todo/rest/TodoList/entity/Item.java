package com.todo.rest.TodoList.entity;

import com.todo.rest.TodoList.util.enums.TodoStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class Item {

    @Id
    private String itemId;

    private String itemName;

    private String itemDescription;

    private Long deadline;

    private TodoStatus status;

    private Long createdTime;

}
