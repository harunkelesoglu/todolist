package com.todo.rest.TodoList.repository;

import com.todo.rest.TodoList.entity.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRespository extends MongoRepository<Item,String> {

    Item findByItemId(String itemId);
}
