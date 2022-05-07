package com.oillive.controller;


import java.util.HashMap;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.UsersService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@Autowired
    PasswordEncoder passwordEncoder;
	
	// 난수생성
	Random rand = new Random();
		
	//--------------- 메인화면 API 호출 --------------- //
	@GetMapping("/home")
	public HashMap<String, Object> home(@RequestParam HashMap<Object, String> req) {
		
		// API 호출 파라미터
		String prodcd = req.get("prodcd");
		String sido = req.get("sido");
		int apiStatus = Integer.parseInt(req.get("apiStatus"));
		
		HashMap<String, Object> result = usersService.home(prodcd, sido, apiStatus);
		
		return result;
	}

	//--------------- 로그인 --------------- //
	@PostMapping("/login")
	public int login(@RequestBody HashMap<Object, String> req) {
		
		int result = 0;
		
		// 암호화된 비밀번호 return
		String secuPwd = usersService.getPassword(req.get("userId"));
		
		// 암호화 비교
		if(passwordEncoder.matches(req.get("userPwd"),secuPwd)){
			result = 1;
		}	
		
		return result;
	}
	
	//--------------- 아이디 중복확인 --------------- //
	@GetMapping("/idCheck/{userId}")
	public int idCheck(@PathVariable String userId) {
		
		int result = usersService.idCheck(userId);
		int mresult = usersService.idMCheck(userId);
		
		result += mresult;
		
		return result;
	}
	
	//--------------- 휴대전화 인증 --------------- //
	@GetMapping("/sendSMS/{phoneNum}")
	public String sendSMS(@PathVariable String phoneNum) {
		
		// 난수생성
		Random rand = new Random();
		String numStr = "";
		
		for(int i=0; i<4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr+=ran;
		}
		
		// 문자 보내는 횟수가 제한되어 있어 막아놓음
		// usersService.sendSMS(phoneNum, numStr);
		
		System.out.println("인증번호 : "+numStr);
		System.out.println("휴대번호 : "+phoneNum);
		
		return numStr;
	}
	
	//--------------- 휴대폰 중복확인 --------------- //
	@GetMapping("/phoneCheck/{phoneNum}")
	public int phoneCheck(@PathVariable String phoneNum) {
		
		int result = 0;
		result = usersService.phoneCheck(phoneNum);
		
		return result;
	}
	
	//--------------- 회원가입 --------------- //
	@PostMapping("/signup")
	public int signup(@RequestBody HashMap<Object, String> req) {
		
		HashMap<String, String> map = new HashMap<String, String>();
		int result = 0;
		String encodedPassword = passwordEncoder.encode(req.get("userPwd"));
		
		map.put("userId", req.get("userId"));
		map.put("userPwd", encodedPassword);
		map.put("userName", req.get("userName"));
		map.put("userPhone", req.get("userPhone"));
		map.put("userGender", req.get("userGender"));
		map.put("userBirth", req.get("userBirth"));
		map.put("userAddress", req.get("userAddress"));
		map.put("userEmail", req.get("userEmail"));
		
		result = usersService.signup(map);
		
		return result;
	}
	
	//--------------- 아이디/비밀번호찾기 휴대전화 인증 --------------- //
	@PostMapping("/findIdPhone")
	public String findIdPhone(@RequestBody HashMap<Object, String> req) {

		// 인증번호
		String numStr = "";
		
		// 이름과 휴대전화로 된 아이디가 있는지 검색
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("username",req.get("username"));
		map.put("userphone",req.get("userphone"));
		String userId = "";
		
		for(int i=0; i<4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr+=ran;
		}
		
		// 서비스를 통해 이름과 휴대전화에 일치하는 아이디가 있는지를 조회
		userId = usersService.findIdPhone(map);
		
		// 아이디가 있다면 인증번호 발송
		if(userId == null) {
			numStr = null;
		} else {
			// 문자 보내는 횟수가 제한되어 있어 막아놓음
			// usersService.sendSMS(req.get("userphone"), numStr);
		}
		
		System.out.println("인증번호 : " + numStr);
		return numStr;
	}
  
	//--------------- 아이디/비밀번호찾기 이메일 인증 --------------- //
	@PostMapping("/findIdEmail")
	public String findIdEmail(@RequestBody HashMap<Object, String> req) {
		
		String numStr = "";
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("username",req.get("username"));
		map.put("useremail",req.get("useremail"));
		
		String userId = "";
		
		for(int i=0; i<4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr+=ran;
		}
		
		// 서비스를 통해 이름과 이메일에 일치하는 아이디가 있는지 검색
		userId = usersService.findIdEmail(map);
		
		if(userId == null) {
			numStr = null;
		} else {
			// 해당하는 값이 있을때 이메일 전송
			usersService.sendEmail(req.get("useremail"), numStr);
		}
		
		System.out.println("인증번호 : " + numStr);
		
		return numStr;
	}
	
	//--------------- 아이디 찾기 결과값 반환 --------------- //
	@PostMapping("/resultId")
	public String resultId(@RequestBody HashMap<Object, String> req) {
	
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("username",req.get("username"));
		
		String userId = "";
		
		// 핸드폰인증 결과
		if(req.get("useremail") == null) {
			map.put("userphone",req.get("userphone"));
			userId = usersService.findIdPhone(map);
		// 이메일인증 결과
		} else {
			map.put("useremail",req.get("useremail"));
			userId = usersService.findIdEmail(map);
		}
		
		return userId;
	}
	
	//--------------- 비밀번호 변경 --------------- //
	@PostMapping("/pwdUpdate")
	public int pwdUpdate(@RequestBody HashMap<Object, String> req) {
	
		int result = 0;
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid",req.get("userid"));
		
		// 암호화
		String encodedPassword = passwordEncoder.encode(req.get("userpwd"));
		
		map.put("userpwd",encodedPassword);
		
		result = usersService.pwdUpdate(map);
		
		return result;
	}
}