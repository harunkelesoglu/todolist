package com.todo.rest.TodoList.repository;

import com.todo.rest.TodoList.entity.TodoList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TodoListRepository extends MongoRepository<TodoList,String> {


    TodoList findByTodoListId(String todoListId);
}
