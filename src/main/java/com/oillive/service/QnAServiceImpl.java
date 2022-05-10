package com.oillive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QnADao;
import com.oillive.vo.QnaVO;

@Service
public class QnAServiceImpl implements QnAService {

	@Autowired
	QnADao qnaDao;

	//--------------- qna 목록 --------------- //
	@Override
	public List<QnaVO> qnaList() {
		return qnaDao.qnaList();
	}
	
}
