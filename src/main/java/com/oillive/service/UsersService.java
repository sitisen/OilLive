package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

public interface UsersService {
	
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
	
	//--------------- 상품 종류 탭 조회 --------------- //	
	public List<String> selectGoodsKind();
	
	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	public int selectGoodsCount();
	
	//--------------- 상품 목록 조회 --------------- //
	public List<GoodsVO> selectGoodsList(String selectedKind, PaginationVO paging);
	
}
