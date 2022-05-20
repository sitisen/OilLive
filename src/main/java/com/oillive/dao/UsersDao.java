package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.CardVO;
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
	
}
