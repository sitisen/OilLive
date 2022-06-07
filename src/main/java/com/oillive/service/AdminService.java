package com.oillive.service;

import com.oillive.vo.EventVO;
import com.oillive.vo.GoodsVO;

public interface AdminService {

	//--------------- 관리자 로그인 비밀번호 --------------- //
	public String getMPassword(String userId);
	
	//--------------- 관리자 이벤트 등록 --------------- //
	public int insertEvent(EventVO event);
	
	//--------------- 관리자 이벤트 변경 --------------- //
	public int updateEvent(EventVO event);
	
	//--------------- 관리자 이벤트 삭제 --------------- //
	public int deleteEvent(String eventCode);
	
	//--------------- 관리자 상품 등록 --------------- //
	public int insertGoods(GoodsVO goods);
	
	//--------------- 관리자 상품 변경 --------------- //
	public int updateGoods(GoodsVO goods);
	
	//--------------- 관리자 상품 삭제 --------------- //
	public int deleteGoods(String goodsCode);

}
