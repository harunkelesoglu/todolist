package com.todo.rest.TodoList.util;


public class ResponseUtil {

    private static ResponseUtil instance = null;

    public static ResponseUtil getInstance() {
        if (instance == null) {
            instance = new ResponseUtil();
        }
        return instance;
    }
    public GenericResponse createGenericResponse(boolean status, String message){

        GenericResponse genericResponse = new GenericResponse();

        genericResponse.setStatus(status);
        genericResponse.setMessage(message);

        return genericResponse;
    }
}
