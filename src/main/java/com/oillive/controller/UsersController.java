package com.oillive.controller;


import java.util.HashMap;
import java.util.List;
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import com.oillive.service.UsersService;
import com.oillive.vo.CardVO;
import com.oillive.vo.UsersVO;

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
	

	//--------------- 사용자 정보 조회 --------------- //
	@PostMapping("/selectUserInfo")
	public List<UsersVO> selectUserInfo(@RequestBody HashMap<Object, String> req) {
	
		String userId = req.get("userId");
		
		List<UsersVO> userInfo = usersService.selectUserInfo(userId);
		
		return userInfo;
	}
	
	//--------------- 사용자 카드 정보 조회 --------------- //
	@PostMapping("/selectCardInfo")
	public List<CardVO> selectCardInfo(@RequestBody HashMap<Object, String> req) {
		
		String userCode = req.get("userCode");
		
		List<CardVO> cardInfo = usersService.selectCardInfo(userCode);
		
		return cardInfo;
	}

	//--------------- 전기차 충전소 --------------- //
	@GetMapping("/electriccar")
	public String electriccar() throws IOException {
		String key = "WdSNS%2BzKpz3RwhPiNQi0e8FMKOMVP8OLryni1q96T8%2F%2FfVfgy2n2MtmorTmqpfphzL76hB8U6DFuqgCutnc5Sg%3D%3D";
		StringBuilder urlBuilder = new StringBuilder("http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList"); /*URL*/
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + key); /*Service Key*/
		urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
		urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
		urlBuilder.append("&" + URLEncoder.encode("addr","UTF-8") + "=" + URLEncoder.encode("전라남도 나주시 전력로 55", "UTF-8")); /*검색대상 충전소주소*/
		
		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("Response code: " + conn.getResponseCode());
		BufferedReader rd;
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
		
		StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
		
		return sb.toString();

	}
	
}