package com.todo.rest.TodoList.controller;

import com.todo.rest.TodoList.entity.Item;
import com.todo.rest.TodoList.entity.TodoList;
import com.todo.rest.TodoList.repository.ItemRespository;
import com.todo.rest.TodoList.repository.TodoListRepository;
import com.todo.rest.TodoList.util.GenericResponse;
import com.todo.rest.TodoList.util.ResponseUtil;
import com.todo.rest.TodoList.util.contant.ServiceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;

@RestController
@RequestMapping("/item")
public class ItemController {

    private GenericResponse response;

    @Autowired
    ItemRespository itemRespository;

    @Autowired
    TodoListRepository todoListRepository;


    @GetMapping("/{itemId}")
    public ResponseEntity<?> getItem(@PathVariable String itemId) {

        try {
            Item item = itemRespository.findByItemId(itemId);

            if (item != null) {
                return new ResponseEntity<>(item, HttpStatus.OK);
            }
            response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.ITEM_NOT_FOUND);

        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createItem(@RequestParam String todoListId, @RequestBody Item item) {
        try {
            TodoList todoList = todoListRepository.findByTodoListId(todoListId);

            if (todoList != null) {
                ArrayList<Item> items = todoList.getItems();
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                item.setCreatedTime(timestamp.getTime());
                item = itemRespository.save(item);
                items.add(item);
                todoList.setItems(items);
                todoListRepository.save(todoList);
                response = ResponseUtil.getInstance().createGenericResponse(true, ServiceMessage.ITEM_CREATE_SUCCESS);
            } else {
                response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.ITEM_CREATE_FAIL);
            }
        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable String itemId) {

        try {
            Item item = itemRespository.findByItemId(itemId);
            if (item != null) {
                itemRespository.delete(item);
                response = ResponseUtil.getInstance().createGenericResponse(true, ServiceMessage.ITEM_DELETE_SUCCESS);
            } else {
                response = ResponseUtil.getInstance().createGenericResponse(false, ServiceMessage.ITEM_NOT_FOUND);
            }
        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false, e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody Item item) {

        try {
            Item willUpdateItem = itemRespository.findByItemId(item.getItemId());

            if(willUpdateItem != null){
                itemRespository.save(item);
                response = ResponseUtil.getInstance().createGenericResponse(true,ServiceMessage.ITEM_UPDATE_SUCCESS);
            }else{
                response = ResponseUtil.getInstance().createGenericResponse(false,ServiceMessage.ITEM_UPDATE_FAIL);
            }

        } catch (Exception e) {
            response = ResponseUtil.getInstance().createGenericResponse(false,e.getMessage());
        }
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
