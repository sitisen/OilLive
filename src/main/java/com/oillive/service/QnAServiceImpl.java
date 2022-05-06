package com.oillive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QnADao;

@Service
public class QnAServiceImpl implements QnAService {

	@Autowired
	QnADao qnaDao;
	
}
