package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring But!";
    }
@GetMapping("/thai")
    public String hello() {
        return "Day la nhanh cua thai!";
    }

}
