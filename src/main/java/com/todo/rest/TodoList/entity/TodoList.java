package com.todo.rest.TodoList.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.todo.rest.TodoList.entity.Item;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="todolists")
@Data
public class TodoList {

    @Id
    private String todoListId;

    private String name;

    @DBRef
    private ArrayList<Item> items;

    private Long createdDate;

}
