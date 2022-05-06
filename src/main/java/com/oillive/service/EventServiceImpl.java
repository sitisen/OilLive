package com.oillive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.EventDao;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	EventDao eventDao;
	
}
