package com.todo.rest.TodoList.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import springfox.documentation.spring.web.plugins.Docket;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket produceApi(){

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.todo.rest.TodoList.controller"))
                .paths(regex("/.*"))
                .build();
    }

    // Information about api

    private ApiInfo apiInfo(){

        return new ApiInfoBuilder()
                .title("Todo List Rest API")
                .description("This page lists all endpoints for Todo List App")
                .version("1.0")
                .build();
    }


}
