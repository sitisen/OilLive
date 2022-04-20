package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
		List<ApiAvgAllPriceVO> AllList = new ArrayList<ApiAvgAllPriceVO>();
		List<ApiAvgSidoPriceVO> SidoList = new ArrayList<ApiAvgSidoPriceVO>();
		List<ApiLowTop10VO> lowTopList = new ArrayList<ApiLowTop10VO>();
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		RestTemplate restTemplate = new RestTemplate();
		
		String baseUrl = null;
		
		// 유가 API 요청 횟수
		int apiRequestCount = 2;
		
		// 유가 API 요청 코드
		for(int i = 0; i < apiRequestCount; i++) {
			
			// API 요청 URL, 결과값 List 선언
			switch(i) {
				case 0: // 전국 주유소 평균가격 API URL
						baseUrl = "http://www.opinet.co.kr/api/avgAllPrice.do?out=json&code=F220314046";
						break;
				case 1: // 시도별 주유소 평균가격 API URLb
						baseUrl = "http://www.opinet.co.kr/api/avgSidoPrice.do?prodcd=" + prodcd + "&out=json&code=F220314046";
						break;
						
				case 2: // 지역별 최저가 주유소 API URL (미완성)
						baseUrl = "http://www.opinet.co.kr/api/lowTop10.do?prodcd=" + prodcd + "&area=" + sigun + "&cnt=10&out=json&code=F220314046";
						break;
			}

			String response = restTemplate.getForObject(baseUrl, String.class);
			
			try {
				
				///////////////////// JSON VO 넣는부분		
				JSONParser jsonParser = new JSONParser();
				
				JSONObject jsonObj = (JSONObject)jsonParser.parse(response.toString());
				
				// JSON Data 가공
				JSONObject parseResult = (JSONObject) jsonObj.get("RESULT");
				
				JSONArray array = (JSONArray) parseResult.get("OIL");
				
				for(int j = 0; j < array.size(); j++) {
					
					jsonObj = (JSONObject)array.get(j);
					
					if( i == 0 ) { // 전국 주유소 평균가격 VO 가공 및 List 추가
						
						ApiAvgAllPriceVO vo = ApiAvgAllPriceVO.builder()
								.tradeDT(jsonObj.get("TRADE_DT").toString())
								.prodcd(jsonObj.get("PRODCD").toString())
								.prodnm(jsonObj.get("PRODNM").toString())
								.price(jsonObj.get("PRICE").toString()) 
								.diff(jsonObj.get("DIFF").toString())
								.build();
						
						AllList.add(vo);
						
					} else if ( i == 1 ) { // 시도별 주유소 평균가격 VO 가공 및 List 추가
						
						ApiAvgSidoPriceVO vo = ApiAvgSidoPriceVO.builder()
								.sidocd(jsonObj.get("SIDOCD").toString())
								.sidonm(jsonObj.get("SIDONM").toString())
								.prodcd(jsonObj.get("PRODCD").toString())
								.price(jsonObj.get("PRICE").toString()) 
								.diff(jsonObj.get("DIFF").toString())
								.build();
						
						SidoList.add(vo);
						
					} else { // 지역별 최저가 주유소 VO 가공 및 List 추가
					
						ApiLowTop10VO vo = ApiLowTop10VO.builder()
								.uniId(jsonObj.get("UNI_ID").toString())
								.price(jsonObj.get("PRICE").toString())
								.pollDivCd(jsonObj.get("POLL_DIV_CD").toString())
								.osNm(jsonObj.get("OS_NM").toString()) 
								.vanAdr(jsonObj.get("VAN_ADR").toString())
								.newAdr(jsonObj.get("NEW_ADR").toString())
								.gisXCoor(jsonObj.get("GIS_X_COOR").toString())
								.gisYCoor(jsonObj.get("GIS_Y_COOR").toString())
								.build();
						
						lowTopList.add(vo);
						
					}
						
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		
		result.put("AllList", AllList);
		result.put("SidoList", SidoList);
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
	
}
