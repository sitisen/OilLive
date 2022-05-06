package com.oillive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QBoardDao;

@Service
public class QBoardServiceImpl implements QBoardService {

	@Autowired
	QBoardDao qBoardDao;
	
}
