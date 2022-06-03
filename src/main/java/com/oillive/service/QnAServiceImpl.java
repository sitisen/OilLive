package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QnADao;
import com.oillive.vo.PaginationVO;
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

	//--------------- qna 전체 수 --------------- //
	@Override
	public int selectQnaCount(String qnaName) {
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("qnaName", qnaName);
		
		return qnaDao.selectQnaCount(param);
	}

	//--------------- qna 목록 페이징 --------------- //
	@Override
	public List<QnaVO> selectQnaList(String qnaName, PaginationVO paging) {
		// 한 페이지 당 8개의 상품 정보를 보여주기 위해 WHERE 절에 쓰일 변수
		int startRow = (paging.getCurrentPage() - 1) * paging.getListRange() + 1;
		int endRow = startRow + paging.getListRange() - 1;
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("qnaName", qnaName);
		param.put("startRow", String.valueOf(startRow));
		param.put("endRow", String.valueOf(endRow));	
		
		return qnaDao.selectQnaList(param);
	}

	//--------------- qna 전체 개수 --------------- //
	@Override
	public int qnaCount() {
		return qnaDao.qnaCount();
	}

	//--------------- qna 삭제 --------------- //
	@Override
	public int qnaDelete(int qnaCode) {
		return qnaDao.qnaDelete(qnaCode);
	}

	//--------------- qna 수정 상세페이지 --------------- //
	@Override
	public QnaVO qnaDetail(int qnaCode) {
		return qnaDao.qnaDetail(qnaCode);
	}

	//--------------- qna 수정하기 --------------- //
	@Override
	public int qnaModify(HashMap<String, Object> map) {
		return qnaDao.qnaModify(map);
	}

	//--------------- qna 작성 --------------- //
	@Override
	public int qnaWrite(HashMap<String, Object> map) {
		return qnaDao.qnaWrite(map);
	}

}
