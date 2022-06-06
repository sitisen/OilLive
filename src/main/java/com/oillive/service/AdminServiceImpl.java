package com.oillive.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.AdminDao;
import com.oillive.vo.EventVO;
import com.oillive.vo.GoodsVO;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao adminDao;
	
	//--------------- 관리자 로그인 비밀번호 --------------- //
	@Override
	public String getMPassword(String userId) {
		return adminDao.getMpassword(userId);
	}

	//--------------- 관리자 이벤트 등록 --------------- //
	@Override
	public int insertEvent(EventVO event) {
		return adminDao.insertEvent(event);
	}
	
	//--------------- 관리자 이벤트 변경 --------------- //	
	@Override
	public int updateEvent(EventVO event) {
		return adminDao.updateEvent(event);
	}

	//--------------- 관리자 이벤트 삭제 --------------- //
	@Override
	public int deleteEvent(String eventCode) {
		return adminDao.deleteEvent(eventCode);
	}

	//--------------- 관리자 상품 등록 --------------- //
	@Override
	public int insertGoods(GoodsVO goods) {
		return adminDao.insertGoods(goods);
	}

	//--------------- 관리자 상품 삭제 --------------- //
	@Override
	public int deleteGoods(String goodsCode) {
		return adminDao.deleteGoods(goodsCode);
	}
	
}
