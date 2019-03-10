package com.todo.rest.TodoList.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value="/index",description="project demo page",produces = "application/text")
@RestController
public class IndexController {


    @GetMapping("/")
    public String index(){
        return "Welcome To Do List Application";
    }




}
