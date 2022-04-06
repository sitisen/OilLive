package com.oillive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@GetMapping("/home")
	public String home() {				
		return "";
	}
	
}
