package com.todo.rest.TodoList.controller;

import com.todo.rest.TodoList.entity.TodoList;
import com.todo.rest.TodoList.entity.User;
import com.todo.rest.TodoList.repository.TodoListRepository;
import com.todo.rest.TodoList.repository.UserRepository;
import com.todo.rest.TodoList.util.GenericResponse;
import com.todo.rest.TodoList.util.ResponseUtil;
import com.todo.rest.TodoList.util.contant.ServiceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todolist")
public class TodoListController {

    private GenericResponse response;

    @Autowired
    TodoListRepository todoListRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/{todoListId}")
    public ResponseEntity<?> getTodoList(@PathVariable String todoListId) {

        try {
            TodoList todoList = todoListRepository.findByTodoListId(todoListId);
            if (todoList != null) {
                return new ResponseEntity<>(todoList, HttpStatus.OK);
            }
            response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.TODO_LIST_NOT_FOUND);
        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTodoList(@RequestBody TodoList todoList) {

        try {

            User user = userRepository.findByUserId("5c85096ea5b10010a06f94ef");
            ArrayList<TodoList> todoLists = user.getTodoLists();
            if(todoLists == null){
                todoLists = new ArrayList<TodoList>();
            }
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            todoList.setCreatedDate(timestamp.getTime());
            todoList = todoListRepository.save(todoList);
            todoLists.add(todoList);
            user.setTodoLists(todoLists);
            userRepository.save(user);
            response = ResponseUtil.getInstance().createGenericResponse(true, ServiceMessage.TODO_LIST_CREATE_SUCCESS);

        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{todoListId}")
    public ResponseEntity<?> deleteTodoList(@PathVariable String todoListId) {

        try {
            TodoList todoList = todoListRepository.findByTodoListId(todoListId);
            if (todoList != null) {

                todoListRepository.delete(todoList);
                response = ResponseUtil.getInstance().createGenericResponse(true, ServiceMessage.TODO_LIST_DELETE_SUCCESS);
            } else {
                response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.TODO_LIST_NOT_FOUND);
            }

        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



}
