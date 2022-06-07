package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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
	
	//--------------- 사용자 장바구니 코드 조회 --------------- //
	public List<String> selectBasketCode(String userCode);
	
	//--------------- 사용자 장바구니 상품 중복 체크 --------------- //
	public int basketExistCheck(HashMap<String, String> param);
	
	//--------------- 사용자 장바구니 상품 추가 --------------- //
	public int insertBasket(HashMap<String, String> param);
	
	//--------------- 사용자 장바구니 수량 조회 --------------- //
	public int getBasketCount(int userCode);
	
	//--------------- 사용자 장바구니 상품 개수 갱신 --------------- //
	public int updateBasketAmount(HashMap<String, String> param);
	
	//--------------- 사용자 장바구니 상품 삭제 --------------- //
	public int deleteBasketGoods(List<String> basketCode);
	
	//--------------- 사용자 결제내역 조회 --------------- //
	public List<OrdersVO> getOrderList(String userId);

	//--------------- 사용자 정보수정 : 휴대폰 --------------- //
	public int updatePhone(HashMap<String, Object> map);

	//--------------- 사용자 정보수정 : 이메일 --------------- //
	public int updateEmail(HashMap<String, Object> map);

	//--------------- 사용자 정보수정 : 주소 --------------- //
	public int updateAddress(HashMap<String, Object> map);

	//--------------- 이용자 목록 --------------- //
	public List<UsersVO> getUserList();

	//--------------- 이메일 중복 --------------- //
	public int getUserEmail(String email);

	//--------------- 이용자 연령별 --------------- //
	public Integer getUserCount(HashMap<String, Integer> m);

	//--------------- 회원탈퇴 --------------- //
	public int quit(int userCode);

	//--------------- 탈퇴유저 검사 --------------- //
	public int quitUser(String userId);
	
}
