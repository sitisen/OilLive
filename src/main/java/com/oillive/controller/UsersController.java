package com.oillive.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.AdminService;
import com.oillive.service.GoodsService;
import com.oillive.service.PaginationService;
import com.oillive.service.UsersService;
import com.oillive.vo.BasketVO;
import com.oillive.vo.CardVO;
import com.oillive.vo.ElectricCarVO;
import com.oillive.vo.PaginationVO;
import com.oillive.vo.UsersVO;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@Autowired
	GoodsService goodsService;
	
	@Autowired
	AdminService adminService;
	
	@Autowired
    PasswordEncoder passwordEncoder;
	
	@Autowired
	PaginationService paginationService;
	
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
		String userId = req.get("userId");
		String pwd = req.get("userPwd");
		
		// 암호화된 비밀번호 return
		String secuPwd = usersService.getPassword(userId);
		
		// 암호화 비교
		if(passwordEncoder.matches(pwd,secuPwd)){
			result = 1;
		}	
		
		// 관리자 로그인
		int mresult = 0; 
		mresult = usersService.idMCheck(userId);
		
		// 관리자 로그인일때
		if(mresult == 1) {
			String mPwd = adminService.getMPassword(userId);
			if(mPwd.equals(pwd)){
				result = 2;
			}
		}		
		
		// 탈퇴한사람인지 확인
		int quit = usersService.quitUser(userId);
		
		// 탈퇴처리한 계정일때
		if(quit == 1) {
			result = 3;
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
		
		// 이메일 중복확인
		int eCount = 0;
		eCount = usersService.getUserEmail(req.get("userEmail"));
		
		if(eCount == 1) {
			result = 2;
		} else {
			map.put("userEmail", req.get("userEmail"));
			map.put("userAddress", req.get("userAddress"));
			result = usersService.signup(map);
		}
		
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
	
	//--------------- 사용자 카드 정보 등록 --------------- //
	@PutMapping("/insertCard")
	public int insertCard(@RequestBody CardVO newCard) {
		
		int result = usersService.insertCard(newCard);
		
		return result;
	}
	
	//--------------- 사용자 카드 정보 등록 --------------- //
	@PatchMapping("/updateCard")
	public int updateCard(@RequestBody CardVO changeCard) {
		
		int result = usersService.updateCard(changeCard);
		
		return result;
	}

	//--------------- 전기차 충전소 --------------- //
	@GetMapping("/electriccar")
	public List<ElectricCarVO> electriccar(@RequestParam( name = "code" ) String code) {
		String zcode = code;
		return usersService.electriccar(zcode);
	}
	
	//--------------- 사용자 장바구니 조회 --------------- //
	@PostMapping("/selectBasket")
	public List<BasketVO> selectBasket(@RequestBody HashMap<String, String> req) {
		
		// 장바구니 코드 조회에 필요한 변수 선언
		String userCode = String.valueOf(usersService.getUserCode(req.get("userId")));
		
		// 사용자의 장바구니 코드들 조회
		List<String> basketCode = usersService.selectBasketCode(userCode);
		
		List<BasketVO> basket = new ArrayList<BasketVO>();
		
		if(	basketCode.size() > 0) { // 장바구니가 비어있지 않을 경우,
			// 특정 장바구니 조회
			basket = goodsService.selectBasket(basketCode, userCode);
		}

		
		return basket;
	}
	
	//--------------- 사용자 장바구니 상품 추가 --------------- //
	@PutMapping("/insertBasket")
	public int insertBasket(@RequestBody HashMap<String, String> req) {
		
		// 장바구니 추가에 필요한 변수 선언
		String userCode = String.valueOf(usersService.getUserCode(req.get("userId")));
		String goodsCode = req.get("goodsCode");
		String basketAmount = req.get("basketAmount");
		int result = 0;

		// 한 명의 사용자 장바구니에 동일한 상품이 존재하는지 확인
		int basketExistCheck = usersService.basketExistCheck(userCode, goodsCode);

		// 장바구니에 해당 상품 INSERT
		if(basketExistCheck == 0) { // 장바구니에 해당 상품이 존재하지 않을 경우,
			result = usersService.insertBasket(userCode, goodsCode, basketAmount);	

		}
		
		return result;
	}
	
	//--------------- 사용자 장바구니 수량 조회 --------------- //
	@GetMapping("/basketCount")
	public int basketCount(@RequestParam( name = "userId" ) String userId) {
		// 유저코드 조회
		int userCode = usersService.getUserCode(userId);
		
		// 장바구니 수량 반환
		return usersService.getBasketCount(userCode);
	}
	
	//--------------- 사용자 장바구니 상품 개수 갱신 --------------- //
	@PatchMapping("/updateBasketAmount")
	public int updateBasketAmount(@RequestBody HashMap<String, String> req) {
		
		String basketCode = req.get("basketCode");
		String amount = req.get("amount");
		
		int result = usersService.updateBasketAmount(basketCode, amount);
		
		return result;
	}
	
	//--------------- 사용자 장바구니 상품 삭제 --------------- //
	@DeleteMapping("/deleteBasketGoods")
	public int deleteBasketGoods(@RequestBody HashMap<String, List<String>> req) {
		
		List<String> basketCode = req.get("basketCode");

		int result = usersService.deleteBasketGoods(basketCode);
		
		return result;
	}
	
	//--------------- 사용자 정보수정 --------------- //
	@PostMapping("/updateInfo")
	public int updateInfo(@RequestBody HashMap<String, String> req) {
		// 업데이트 처리
		return usersService.updateInfo(req);
	}
	
	//--------------- 사용자 이메일 인증 --------------- //
	@PostMapping("/sendEmail")
	public String sendEmail(@RequestBody HashMap<String, String> req) {
		// 인증번호
		String numStr = "";
		
		for(int i=0; i<4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr+=ran;
		}
		
		usersService.sendEmail(req.get("email"), numStr);
		
		System.out.println("인증번호 : " + numStr);
		return numStr;
	}
	
	//--------------- 이용자 목록 --------------- //
	@GetMapping("/getUserList")
	public List<UsersVO> getUserList(){
		return usersService.getUserList();
	}
	
	//--------------- 이용자수 --------------- //
	@GetMapping("/getUserCount")
	public List<Integer> getUserCount(){
		return usersService.getUserCount();
	}
	
	//--------------- 회원탈퇴 --------------- //
	@GetMapping("/quit")
	public int quit(@RequestParam( name = "userId" ) String userId){
		// 유저코드 받아옴
		int userCode = usersService.getUserCode(userId);
		
		return usersService.quit(userCode);
	}
	
	//--------------- 회원목록 페이징 --------------- //
	@GetMapping("/userListPage")
	public HashMap<String, Object> userListPage( @RequestParam( name = "userId" ) String userId,
			@RequestParam( name = "currentPage" ) int currentPage ) {
		
		// Pagination 처리 변수
		int totalCount = usersService.selectUserCount(userId); // Qna 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 5; // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// qna 목록이 담기는 리스트
		List<UsersVO> userList = usersService.selectUserList(userId, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("userList", userList);
		
		return result;
	}
	
	//--------------- 회원탈퇴 취소처리 --------------- //
	@GetMapping("/cancelQuit")
	public int cancelQuit(@RequestParam( name = "userCode" ) String userCode){
		return usersService.cancelQuit(userCode);
	}
}


