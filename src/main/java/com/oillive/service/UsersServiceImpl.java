package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.oillive.dao.UsersDao;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class UsersServiceImpl implements UsersService{

	@Autowired
	UsersDao usersDao;
	
	@Autowired
	private JavaMailSender javaMailSender;

	//--------------- 로그인 --------------- //
	@Override
	public int login(HashMap<String, String> map) {
		return usersDao.login(map);
	}

	//--------------- 아이디 중복확인 --------------- //
	@Override
	public int idCheck(String userId) {
		return usersDao.idCheck(userId);
	}
	// 관리자
	@Override
	public int idMCheck(String userId) {
		return usersDao.idMCheck(userId);
	}

	//--------------- 휴대전화 인증 --------------- //
	@Override
	public void sendSMS(String phoneNum, String numStr) {
		
		// 키등록
		String api_key = "NCSVHOEQHVKA04XW";
		String api_secret = "QE3EXFCNAUYUJF0SGIWCUN2SEGDNQVY7";
		Message coolsms = new Message(api_key, api_secret);
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNum);
		params.put("from", "01056125452");
		params.put("type", "SMS");
		params.put("text", "[오일라이브] 인증번호"+ numStr + "를 입력하세요.");
		
		try {
			coolsms.send(params);
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}
		
	}

	//--------------- 휴대폰 중복확인 --------------- //
	@Override
	public int phoneCheck(String phoneNum) {
		return usersDao.phoneCheck(phoneNum);
	}
	
	//--------------- 회원가입 --------------- //
	@Override
	public int signup(HashMap<String, String> map) {
		return usersDao.signup(map);
	}

	//--------------- 비밀번호 반환 --------------- //
	@Override
	public String getPassword(String userId) {
		return usersDao.getPassword(userId);
	}

	//--------------- 아이디 찾기 - 휴대전화 인증 --------------- //
	@Override
	public String findIdPhone(HashMap<String, String> map) {
		return usersDao.findIdPhone(map);
	}

	//--------------- 아이디 찾기 - 이메일 인증 --------------- //
	@Override
	public String findIdEmail(HashMap<String, String> map) {
		return usersDao.findIdEmail(map);
	}

	//--------------- 이메일 인증 --------------- //
	@Override
	public void sendEmail(String email, String numStr) {
		
		// 단순 텍스트 구성 메시지 생성할때 사용
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		
		// 수신자
		simpleMailMessage.setTo(email);
		
		// 메일 제목
		simpleMailMessage.setSubject("오일라이브 인증번호 입니다.");
		
		// 메일 내용
		simpleMailMessage.setText("인증번호는 " + numStr +"입니다.");
		
		// 메일 발송
		javaMailSender.send(simpleMailMessage);
	}

	//--------------- 상품 종류 탭 조회 --------------- //
	@Override
	public List<String> selectGoodsKind() {
		return usersDao.selectGoodsKind();
	}

	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	@Override
	public int selectGoodsCount() {
		return usersDao.selectGoodsCount();
	}
	
	//--------------- 상품 목록 조회 --------------- //
	@Override
	public List<GoodsVO> selectGoodsList(String selectedKind, PaginationVO paging) {
		
		// 한 페이지 당 15개의 상품 정보를 보여주기 위해 WHERE 절에 쓰일 변수
		int startRow = (paging.getCurrentPage() - 1) * paging.getListRange() + 1;
		int endRow = startRow + paging.getListRange() - 1;
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();
		
		param.put("selectedKind", selectedKind);
		param.put("startRow", String.valueOf(startRow));
		param.put("endRow", String.valueOf(endRow));	
		
		return usersDao.selectGoodsList(param);
	}
	
	
}
