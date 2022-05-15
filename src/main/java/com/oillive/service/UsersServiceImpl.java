package com.oillive.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.oillive.dao.UsersDao;
import com.oillive.vo.ApiAvgAllPriceVO;
import com.oillive.vo.ApiAvgRecentPriceVO;
import com.oillive.vo.ApiAvgSidoPriceVO;
import com.oillive.vo.ApiLowTop10VO;
import com.oillive.vo.UsersVO;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class UsersServiceImpl implements UsersService{

	@Autowired
	UsersDao usersDao;
	
	@Autowired
	private JavaMailSender javaMailSender;

	//--------------- 메인화면 API 호출 --------------- //
	@Override
	public HashMap<String, Object> home(String prodcd, String sido, int apiStatus) {
		
		// API 호출 변수 세팅
		List<ApiAvgAllPriceVO> allList = new ArrayList<ApiAvgAllPriceVO>();
		List<ApiAvgSidoPriceVO> sidoList = new ArrayList<ApiAvgSidoPriceVO>();
		List<ApiAvgRecentPriceVO> recentList = new ArrayList<ApiAvgRecentPriceVO>();
		List<ApiLowTop10VO> lowTopList = new ArrayList<ApiLowTop10VO>();
		
		List<JSONObject> avgRecentTemp = new ArrayList<JSONObject>();
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		RestTemplate restTemplate = new RestTemplate();
		String baseUrl = null;
		
		// 유가 API 요청 횟수
		int apiRequestCount = 5;
		
		if( apiStatus == 1 ) { // 시도별 최저가 주유소 TOP 10 API 만 요청할 경우
			
			apiRequestCount = 1;
			
		}
		
		// 2가지 API를 한 개의 VO로 가공할 때, 쓰이는 인덱스 값
		int idx = 0;
		
		// 유가 API 요청 코드
		for( int i = 0; i < apiRequestCount; i++ ) {
			
			// API 요청 URL, 결과값 List 선언
			switch( i ) {
				case 0: // 지역별 최저가 주유소 API URL
						baseUrl = "http://www.opinet.co.kr/api/lowTop10.do?prodcd=" + prodcd + "&area=" + sido + "&cnt=10&out=json&code=F220411106";
						break;
			
				case 1: // 전국 주유소 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgAllPrice.do?out=json&code=F220411106";
						break;
						
				case 2: // 시도별 주유소 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgSidoPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
						break;
						
				case 3: // 최근 7일간 전국 일일 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgRecentPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
						break;
						
				case 4: // 최근 7일간 전국 일일 상표별 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/pollAvgRecentPrice.do?prodcd=" + prodcd + "&out=json&code=F220411106";
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
				
				for( int j = 0; j < array.size(); j++ ) {
					
					jsonObj = (JSONObject)array.get(j);
					
					switch( i ) { // apiRequestCount 값에 따라 VO 가공
					
						case 0: // 지역별 최저가 주유소 VO 가공 및 List 추가
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
					
					
						case 1: // 전국 주유소 평균가격 VO 가공 및 List 추가
								ApiAvgAllPriceVO allVO = ApiAvgAllPriceVO.builder()
														 .tradeDT(jsonObj.get("TRADE_DT").toString())
														 .prodcd(jsonObj.get("PRODCD").toString())
														 .prodnm(jsonObj.get("PRODNM").toString())
														 .price(jsonObj.get("PRICE").toString()) 
														 .diff(jsonObj.get("DIFF").toString())
														 .build();
								
								allList.add(allVO);
								break;
								
						case 2: // 시도별 주유소 평균가격 VO 가공 및 List 추가
								ApiAvgSidoPriceVO sidoVO = ApiAvgSidoPriceVO.builder()
															.sidocd(jsonObj.get("SIDOCD").toString())
															.sidonm(jsonObj.get("SIDONM").toString())
															.prodcd(jsonObj.get("PRODCD").toString())
															.price(jsonObj.get("PRICE").toString()) 
															.diff(jsonObj.get("DIFF").toString())
															.build();
						
								sidoList.add(sidoVO);
								break;
						
						case 3: // 최근 7일간 전국 일일 평균가격 VO 가공 전, 임시로 넣어두기
								avgRecentTemp.add(jsonObj);
								break;
								
						case 4: // 최근 7일간 전국 일일 평균가격, 최근 7일간 전국 일일 상표별 평균가격 VO 가공 및 List 추가
								
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

	//--------------- 비밀번호 변경 --------------- //
	@Override
	public int pwdUpdate(HashMap<String, String> map) {
		return usersDao.pwdUpdate(map);
	}

	@Override
	public List<UsersVO> selectUserInfo(String userId) {
		return usersDao.selectUserInfo(userId);
	}	
	
}
