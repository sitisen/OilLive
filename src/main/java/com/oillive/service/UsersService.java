package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import com.oillive.vo.CardVO;
import com.oillive.vo.ElectricCarVO;
import com.oillive.vo.PaginationVO;
import com.oillive.vo.UsersVO;

public interface UsersService {
	
	//--------------- 메인화면 API 호출 --------------- //
	public HashMap<String, Object> home(String prodcd, String sido, int apiStatus);
	
	//--------------- 로그인 --------------- //
	public int login(HashMap<String, String> map);
	
	//--------------- 아이디 중복확인 --------------- //
	public int idCheck(String userId);	// 사용자
	public int idMCheck(String userId); // 관리자

	//--------------- 휴대전화 인증 --------------- //
	public void sendSMS(String phoneNum, String numStr);

	//--------------- 휴대폰 중복확인 --------------- //
	public int phoneCheck(String phoneNum);
	
	//--------------- 회원가입 --------------- //
	public int signup(HashMap<String, String> map);

	//--------------- 아이디에 해당하는 비밀번호 반환 --------------- //
	public String getPassword(String userId);

	//--------------- 아이디 찾기 - 휴대전화 인증 --------------- //
	public String findIdPhone(HashMap<String, String> map);

	//--------------- 아이디 찾기 - 이메일 인증 --------------- //
	public String findIdEmail(HashMap<String, String> map);

	//--------------- 이메일 인증 --------------- //
	public void sendEmail(String email, String numStr);

	//--------------- 비밀번호 변경 --------------- //
	public int pwdUpdate(HashMap<String, String> map);

	//--------------- 사용자 정보 조회 --------------- //
	public List<UsersVO> selectUserInfo(String userId);
	
	//--------------- 사용자 카드 정보 조회 --------------- //
	public List<CardVO> selectCardInfo(String userCode);
	
	//--------------- 사용자 카드 정보 등록 --------------- //
	public int insertCard(CardVO newCard);
	
	//--------------- 사용자 카드 정보 교체 --------------- //
	public int updateCard(CardVO changeCard);
	
	//--------------- 유저 코드값 가져오기 --------------- //
	public int getUserCode(String userId);

	//--------------- 전기차 충전소 --------------- //
	public List<ElectricCarVO> electriccar(String zcode);
	
	//--------------- 사용자 장바구니 코드 조회 --------------- //
	public List<String> selectBasketCode(String userCode);
	
	//--------------- 사용자 장바구니 상품 중복 체크 --------------- //
	public int basketExistCheck(String userCode, String goodsCode);
	
	//--------------- 사용자 장바구니 상품 추가 --------------- //
	public int insertBasket(String userCode, String goodsCode, String basketAmount);
	
	//--------------- 사용자 장바구니 수량 조회 --------------- //
	public int getBasketCount(int userCode);
	
	//--------------- 사용자 장바구니 상품 개수 갱신 --------------- //
	public int updateBasketAmount(String basketCode, String amount);

	//--------------- 사용자 장바구니 상품 삭제 --------------- //
	public int deleteBasketGoods(List<String> basketCode);
	
	//--------------- 사용자 정보 수정 --------------- //
	public int updateInfo(HashMap<String, String> req);

	//--------------- 이용자 목록 --------------- //
	public List<UsersVO> getUserList();

	//--------------- 이메일 중복여부 --------------- //	
	public int getUserEmail(String email);

	//--------------- 이용자수 --------------- //	
	public List<Integer> getUserCount();

	//--------------- 회원탈퇴 --------------- //	
	public int quit(int userCode);

	//--------------- 탈퇴유저 검사 --------------- //	
	public int quitUser(String userId);

	//--------------- 회원목록 페이징 개수 --------------- //	
	public int selectUserCount(String userId);

	//--------------- 회원목록 페이징 --------------- //	
	public List<UsersVO> selectUserList(String userId, PaginationVO paging);

	//--------------- 회원탈퇴 취소처리 --------------- //	
	public int cancelQuit(String userCode);
	
}
