package com.todo.rest.TodoList.util.contant;

public interface ServiceMessage {

    String SUCCESS = "Success";
    String ERROR = "Error";

    String USER_NOT_FOUND = "User Not Found";
    String USER_REGISTER_SUCCESS = "User registration successful";
    String USER_REGISTER_FAIL = "User registration failed";
    String USER_ALREADY_EXIST = "User already exist";

    String LOGIN_FAIL = "Login failed. Check username and password";

    String TODO_LIST_CREATE_SUCCESS = "Todo list creation successful";
    String TODO_LIST_CREATE_FAIL = "Todo list creation failed";
    String TODO_LIST_NOT_FOUND = "Todo list not found";
    String TODO_LIST_DELETE_SUCCESS = "Todo list deleted";
    String HAVE_NOT_TODOLIST = "Sorry, you have not list";

    String ITEM_CREATE_FAIL = "Item creation failed";
    String ITEM_CREATE_SUCCESS = "Item creation success";
    String ITEM_NOT_FOUND = "Item not found";
    String ITEM_DELETE_SUCCESS = "Item deleted";
    String ITEM_UPDATE_SUCCESS = "Item updated";
    String ITEM_UPDATE_FAIL = "Item update failed";



}
