package com.reviewia.reviewiaapi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(value = "/api")
    public String testOutput() {
        return "This works";
    }
}
