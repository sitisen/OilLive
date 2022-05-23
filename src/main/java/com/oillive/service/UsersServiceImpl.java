package com.oillive.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.oillive.dao.UsersDao;
import com.oillive.vo.ApiAvgAllPriceVO;
import com.oillive.vo.ApiAvgRecentPriceVO;
import com.oillive.vo.ApiAvgSidoPriceVO;
import com.oillive.vo.ApiLowTop10VO;
import com.oillive.vo.CardVO;
import com.oillive.vo.ElectricCarVO;
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


	//--------------- 사용자 정보 조회 --------------- //
	@Override
	public List<UsersVO> selectUserInfo(String userId) {
		return usersDao.selectUserInfo(userId);
	}

	//--------------- 사용자 카드 정보 조회 --------------- //
	@Override
	public List<CardVO> selectCardInfo(String userCode) {
		return usersDao.selectCardInfo(userCode);
	}

	//--------------- 사용자 카드 정보 등록 --------------- //
	@Override
	public int insertCard(CardVO newCard) {
		return usersDao.insertCard(newCard);
	}
	
	//--------------- 사용자 카드 정보 교체 --------------- //
	@Override
	public int updateCard(CardVO changeCard) {
		return usersDao.updateCard(changeCard);
	}

	//--------------- 유저코드 반환 --------------- //
	@Override
	public int getUserCode(String userId) {
		return usersDao.getUserCode(userId);

	}

	//--------------- 전기차 충전소 ---------------- //
	@Override
	public List<ElectricCarVO> electriccar(String zcode) {
		String key = "WdSNS%2BzKpz3RwhPiNQi0e8FMKOMVP8OLryni1q96T8%2F%2FfVfgy2n2MtmorTmqpfphzL76hB8U6DFuqgCutnc5Sg%3D%3D";
		List<ElectricCarVO> carList = new ArrayList<ElectricCarVO>();
		try {
			StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B552584/EvCharger/getChargerInfo"); /*URL*/
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "="+key); /*Service Key*/
	        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
	        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과 수 (최소 10, 최대 9999)*/
	        urlBuilder.append("&" + URLEncoder.encode("zcode","UTF-8") + "=" + URLEncoder.encode(zcode, "UTF-8")); /*시도 코드 (행정구역코드 앞 2자리)*/
	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");
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
	        
	        List<HashMap<String, String>> list = getResultMap(sb.toString());
	        
	        for(Map<String,String> tmpMap : list) {
	        	ElectricCarVO vo = new ElectricCarVO();
	        	vo.setAddr(tmpMap.get("addr"));
	        	vo.setLat(tmpMap.get("lat"));
	        	vo.setLng(tmpMap.get("lng"));
	        	vo.setStatId(tmpMap.get("statId"));
	        	vo.setStatNm(tmpMap.get("statNm"));
	        	vo.setZcode(tmpMap.get("zcode"));
	        	vo.setStat(tmpMap.get("stat"));
	        	vo.setParkingFree(tmpMap.get("parkingFree"));
	        	vo.setBusiCall(tmpMap.get("busiCall"));
	        	vo.setUseTime(tmpMap.get("useTime"));
	        	carList.add(vo);
	        }
	       
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return carList;
	}	
	
	//--------------- xml 파싱 --------------- //
	public static List<HashMap<String, String>> getResultMap(String data) throws Exception {
		 
		//결과값을 넣어줄 map을 선언해줍니다.
		List<HashMap<String, String>> resultMap = new LinkedList<HashMap<String, String>>();
		        
		InputSource is = new InputSource(new StringReader(data));
		 
		//Document 클래스로 xml데이터를 취득합니다.
		Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(is);
		 
		//xPath 팩토리로 객체를 만듭니다.
		XPath xpath = XPathFactory.newInstance().newXPath();
		 
		//xPath를 컴파일한 후에 node단위로 데이터를 수집합니다.
		NodeList nodeList = (NodeList) xpath.compile("/response/body/items/item").evaluate(document, XPathConstants.NODESET);
		int nodeListCount = nodeList.getLength();
		for (int i = 0; i < nodeListCount; i++) {
		    NodeList childNode = nodeList.item(i).getChildNodes();
		    HashMap<String, String> nodeMap = new HashMap<String, String>();
		    int childNodeCount = childNode.getLength();
		    for (int j = 0; j < childNodeCount; j++) {
		        nodeMap.put(childNode.item(j).getNodeName(), childNode.item(j).getTextContent());
		    }
		    resultMap.add(nodeMap);
		}
		
		return resultMap;
	}
	
	//--------------- 사용자 장바구니 상품 추가 --------------- //
	@Override
	public int insertBasket(String userCode, String goodsCode, String basketAmount) {
		HashMap<String, String> param = new HashMap<String, String>();
		
		param.put("userCode", userCode);
		param.put("goodsCode", goodsCode);
		param.put("basketAmount", basketAmount);
		
		return usersDao.insertBasket(param);
	}
	
	//--------------- 사용자 장바구니 수량 조회 --------------- //
	@Override
	public int getBasketCount(String userCode) {
		System.out.println("1개");
		return usersDao.getBasketCount(userCode);
	}

	//--------------- 사용자 장바구니 수량 조회 (중복 체크) --------------- //
	@Override
	public int getBasketCount(String userCode, String goodsCode) {
		HashMap<String, String> param = new HashMap<String, String>();
		
		param.put("userCode", userCode);
		param.put("goodsCode", goodsCode);

		System.out.println("2개");
		return usersDao.getBasketCount(param);
	}

}
