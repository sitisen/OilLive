package com.oillive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.QBoardService;

@RestController
@RequestMapping("/qBoard")
@CrossOrigin(origins = "http://localhost:3000")
public class QBoardController {

	@Autowired
	QBoardService qBoardService;
	
}
