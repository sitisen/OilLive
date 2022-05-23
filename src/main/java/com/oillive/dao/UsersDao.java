package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.oillive.vo.CardVO;
import com.oillive.vo.OrdersVO;
import com.oillive.vo.UsersVO;

@Mapper
public interface UsersDao {
	
	//--------------- 로그인 --------------- //
	public int login(HashMap<String, String> map);
	
	//--------------- 아이디 중복확인 --------------- //
	public int idCheck(String userId);	// 사용자
	public int idMCheck(String userId);	// 관리자

	//--------------- 핸드폰 중복확인 --------------- //
	public int phoneCheck(String phoneNum);
	
	//--------------- 회원가입 --------------- //
	public int signup(HashMap<String, String> map);

	//--------------- 비밀번호 반환 --------------- //
	public String getPassword(String userId);

	//--------------- 아이디 찾기 - 휴대전화 --------------- //
	public String findIdPhone(HashMap<String, String> map);

	//--------------- 아이디 찾기 - 이메일 --------------- //
	public String findIdEmail(HashMap<String, String> map);

	//--------------- 비밀번호 변경 --------------- //
	public int pwdUpdate(HashMap<String, String> map);

	//--------------- 유저코드 반환 --------------- //
	public int getUserCode(String userId);
	
	//--------------- 사용자 정보 조회 --------------- //
	public List<UsersVO> selectUserInfo(String userId);
	
	//--------------- 사용자 카드 정보 조회 --------------- //
	public List<CardVO> selectCardInfo(String userCode);
	
	//--------------- 사용자 카드 정보 등록 --------------- //
	public int insertCard(CardVO newCard);
	
	//--------------- 사용자 카드 정보 교체 --------------- //
	public int updateCard(CardVO changeCard);
	
	//--------------- 사용자 장바구니 상품 추가 --------------- //
	public int insertBasket(HashMap<String, String> param);
	
	//--------------- 사용자 장바구니 수량 조회 --------------- //
	public int getBasketCount(String userCode);
	
	//--------------- 사용자 장바구니 수량 조회 (중복 체크) --------------- //
	public int getBasketCount(HashMap<String, String> param);
	
	//--------------- 사용자 결제내역 조회 --------------- //
	public List<OrdersVO> getOrderList(String userId);
	
}
