package com.oillive.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.UsersService;
import com.oillive.vo.ApiAvgSidoPriceVO;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@GetMapping("/home")
	public List<ApiAvgSidoPriceVO> home() {				
		StringBuilder result = new StringBuilder();
		List<ApiAvgSidoPriceVO> list = new ArrayList<ApiAvgSidoPriceVO>();
		
		// URL Parameter 값 React 에서 전달한 값으로 대입할 예정
		String urlstr = "http://www.opinet.co.kr/api/avgSidoPrice.do?prodcd=B027&out=json&code=F220314046";
		
		try {
			
			URL url = new URL(urlstr);
			
			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
			urlconnection.setRequestMethod("GET");
			
			BufferedReader br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(), "UTF-8"));
			
			String returnLine;
			
			while((returnLine = br.readLine())!= null) {
				result.append(returnLine + "\n");
			}
		
			urlconnection.disconnect();
			
			///////////////////// JSON VO 넣는부분
			JSONObject jObj;
			
			JSONParser jsonParser = new JSONParser();
			
			JSONObject jsonObj = (JSONObject) jsonParser.parse(result.toString());
			
			JSONObject parseResult = (JSONObject) jsonObj.get("RESULT");
			
			JSONArray array = (JSONArray) parseResult.get("OIL");
			
			for(int i = 0; i<array.size(); i++) {
				jObj = (JSONObject)array.get(i);
				
				ApiAvgSidoPriceVO vo = ApiAvgSidoPriceVO.builder()
						.sidocd(jObj.get("SIDOCD").toString())
						.sidonm(jObj.get("SIDONM").toString())
						.prodcd(jObj.get("PRODCD").toString())
						.price(jObj.get("PRICE").toString()) 
						.diff(jObj.get("DIFF").toString())
						.build();
				
				list.add(vo);
				
 				System.out.println("list ::::: " + list.get(i) + "\n");
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		  
		return list;
	}
	
	//--------------- 로그인 --------------- //
	
	@PostMapping("/login")
	public int login(@RequestBody HashMap<Object, String>req) {
		
		HashMap<String, String> map = new HashMap<String, String>();
		
		// User Id, Pwd 받아와서 Service 전송
		map.put("userId", req.get("userId"));
		map.put("userPwd", req.get("userPwd"));

		int result = usersService.login(map);
		
		System.out.println("result ::: " + result);
		return result;
	}
}
