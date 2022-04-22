package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.oillive.service.UsersService;
import com.oillive.vo.ApiAvgAllPriceVO;
import com.oillive.vo.ApiAvgRecentPriceVO;
import com.oillive.vo.ApiAvgSidoPriceVO;
import com.oillive.vo.ApiLowTop10VO;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@GetMapping("/home")
	public HashMap<String, Object> home(@RequestParam HashMap<Object, String> req) {
		
		String prodcd = req.get("prodcd");
		String sido = req.get("sido");
		String sigun = req.get("sigun");
		
		
		// Service 로 이전 예정		
		List<ApiAvgAllPriceVO> allList = new ArrayList<ApiAvgAllPriceVO>();
		List<ApiAvgSidoPriceVO> sidoList = new ArrayList<ApiAvgSidoPriceVO>();
		List<ApiAvgRecentPriceVO> recentList = new ArrayList<ApiAvgRecentPriceVO>();
		List<ApiLowTop10VO> lowTopList = new ArrayList<ApiLowTop10VO>();
		
		List<JSONObject> avgRecentTemp = new ArrayList<JSONObject>();
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		RestTemplate restTemplate = new RestTemplate();
		String baseUrl = null;
		
		// 유가 API 요청 횟수
		int apiRequestCount = 4;
		
		// 2가지 API를 한 개의 VO로 가공할 때, 쓰이는 인덱스 값
		int idx = 0;
		
		// 유가 API 요청 코드
		for(int i = 0; i < apiRequestCount; i++) {
			
			// API 요청 URL, 결과값 List 선언
			switch(i) {
				case 0: // 전국 주유소 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgAllPrice.do?out=json&code=F220411106";
						break;
						
				case 1: // 시도별 주유소 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgSidoPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
						break;
						
				case 2: // 최근 7일간 전국 일일 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgRecentPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
						break;
						
				case 3: // 최근 7일간 전국 일일 상표별 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/pollAvgRecentPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
						break;
						
				case 4: // 지역별 최저가 주유소 API URL (미완성)
						baseUrl = "http://www.opinet.co.kr/api/lowTop10.do?prodcd=" + prodcd + "&area=" + sido + "&cnt=10&out=json&code=F220411106";
						break;
			}

			String response = restTemplate.getForObject(baseUrl, String.class);
			
			try {
				
				// JSON VO 넣는부분		
				JSONParser jsonParser = new JSONParser();
				
				JSONObject jsonObj = (JSONObject)jsonParser.parse(response.toString());
			
				
				// JSON Data 가공
				JSONObject parseResult = (JSONObject)jsonObj.get("RESULT");
				
				JSONArray array = (JSONArray)parseResult.get("OIL");
				
				for(int j = 0; j < array.size(); j++) {
					
					jsonObj = (JSONObject)array.get(j);
					
					switch(i) {
					
						case 0: // 전국 주유소 평균가격 VO 가공 및 List 추가
								ApiAvgAllPriceVO allVO = ApiAvgAllPriceVO.builder()
														 .tradeDT(jsonObj.get("TRADE_DT").toString())
														 .prodcd(jsonObj.get("PRODCD").toString())
														 .prodnm(jsonObj.get("PRODNM").toString())
														 .price(jsonObj.get("PRICE").toString()) 
														 .diff(jsonObj.get("DIFF").toString())
														 .build();
								
								allList.add(allVO);
								break;
								
						case 1: // 시도별 주유소 평균가격 VO 가공 및 List 추가
								ApiAvgSidoPriceVO sidoVO = ApiAvgSidoPriceVO.builder()
															.sidocd(jsonObj.get("SIDOCD").toString())
															.sidonm(jsonObj.get("SIDONM").toString())
															.prodcd(jsonObj.get("PRODCD").toString())
															.price(jsonObj.get("PRICE").toString()) 
															.diff(jsonObj.get("DIFF").toString())
															.build();
						
								sidoList.add(sidoVO);
								break;
						
						case 2: // 최근 7일간 전국 일일 평균가격 VO 가공 전, 임시로 넣어두기
								avgRecentTemp.add(jsonObj);
								break;
								
						case 3: // 최근 7일간 전국 일일 평균가격, 최근 7일간 전국 일일 상표별 평균가격 VO 가공 및 List 추가
								
								// Front-End 에서 그래프로 활용하기 위해, 2가지 API를 한 개의 VO로 가공하는 로직
								String dateCompare = String.valueOf(jsonObj.get("DATE")); // API 상표별 날짜로 초기화

								if ( dateCompare != null && 
									! dateCompare.equals(avgRecentTemp.get(idx).get("DATE")) ) { // 상표별 날짜가 null이 아니고, 상표별 날짜와 전국 날짜가 같지 않으면 true
									
									idx += 1; // 날짜를 같게 하기 위해, idx + 1
									
								}
								
								ApiAvgRecentPriceVO recentVO = ApiAvgRecentPriceVO.builder()
																.date(avgRecentTemp.get(idx).get("DATE").toString().substring(4, 6) + '/' + jsonObj.get("DATE").toString().substring(6, 8))
																.prodcd(avgRecentTemp.get(idx).get("PRODCD").toString())
																.pollDivCd(jsonObj.get("POLL_DIV_CD").toString())
																.allPrice(avgRecentTemp.get(idx).get("PRICE").toString())
																.pollPrice(jsonObj.get("PRICE").toString())
																.build();
								recentList.add(recentVO);
								break;
								
						case 4: // 지역별 최저가 주유소 VO 가공 및 List 추가 (미완성)
								ApiLowTop10VO lowTopVO = ApiLowTop10VO.builder()
														  .uniId(jsonObj.get("UNI_ID").toString())
														  .price(jsonObj.get("PRICE").toString())
														  .pollDivCd(jsonObj.get("POLL_DIV_CD").toString())
														  .osNm(jsonObj.get("OS_NM").toString()) 
		 												  .vanAdr(jsonObj.get("VAN_ADR").toString())
														  .newAdr(jsonObj.get("NEW_ADR").toString())
														  .gisXCoor(jsonObj.get("GIS_X_COOR").toString())
														  .gisYCoor(jsonObj.get("GIS_Y_COOR").toString())
														  .build();
						
								lowTopList.add(lowTopVO);
								break;
							
					}
						
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		
		result.put("allList", allList);
		result.put("sidoList", sidoList);
		result.put("recentList", recentList);
		result.put("lowTopList", lowTopList);
		
		return result;
	}

	//--------------- 로그인 --------------- //
	@PostMapping("/login")
	public int login(@RequestBody HashMap<Object, String> req) {
		
		HashMap<String, String> map = new HashMap<String, String>();
		
		// User Id, Pwd 받아와서 Service 전송
		map.put("userId", req.get("userId"));
		map.put("userPwd", req.get("userPwd"));

		int result = usersService.login(map);
		
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
		
		map.put("userId", req.get("userId"));
		map.put("userPwd", req.get("userPwd"));
		map.put("userName", req.get("userName"));
		map.put("userPhone", req.get("userPhone"));
		map.put("userGender", req.get("userGender"));
		map.put("userBirth", req.get("userBirth"));
		map.put("userAddress", req.get("userAddress"));
		map.put("userEmail", req.get("userEmail"));
		
		result = usersService.signup(map);
		
		return result;
	}
	
}