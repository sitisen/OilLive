package com.oillive.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oillive.service.AdminService;
import com.oillive.service.EventService;
import com.oillive.service.PaginationService;
import com.oillive.service.UploadService;
import com.oillive.vo.EventVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	
	@Autowired
	AdminService adminService;
	
	@Autowired
	EventService eventService;
	
	@Autowired
	PaginationService paginationService;
	
	@Autowired
	UploadService uploadService;
	
	//--------------- 이벤트 목록 조회 --------------- //
	@GetMapping("/selectEventList")
	public HashMap<String, Object> selectEventList( @RequestParam( name = "title" ) String eventName,
													@RequestParam( name = "filterName" ) String filterName,
													@RequestParam( name = "page" ) int currentPage ) {
		
		// Pagination 처리 변수
		int totalCount = eventService.selectEventCount(eventName, filterName); // EVENT 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 5; // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// 이벤트 목록이 담기는 리스트
		List<EventVO> eventList = eventService.selectEventList(eventName, filterName, paging);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("paging", paging);
		result.put("eventList", eventList);
		
		return result;
	}
	
	//--------------- 관리자 이벤트 등록 --------------- //
	@PutMapping("/insertEvent")
	public int insertEvent(@RequestBody HashMap<String, String> req) {

		String eventName = req.get("eventName");
		String eventContent = req.get("eventContent");
		String eventStartDate = req.get("startDate");
		String eventEndDate = req.get("endDate");
		
		int result = adminService.insertEvent(eventName, eventContent, eventStartDate, eventEndDate);
		
		return result;
	}
	
	//--------------- 관리자 이벤트 등록 (이미지 등록) --------------- //
	@PostMapping("/insertEventUpload")
	public int insertEventUpload(@RequestParam("img") MultipartFile file) {
	
		int result = 0;
		
		try {
			result = uploadService.upLoad("E", file);
			
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
			
		}
		
		return result;
	}
	
	//--------------- 관리자 이벤트 변경 --------------- //
	@PutMapping("/updateEvent")
	public int  updateEvent(@RequestBody HashMap<String, String> req) {
		
		String eventCode = req.get("eventCode");
		String eventName = req.get("eventName");
		String eventContent = req.get("eventContent");
		String eventStartDate = req.get("startDate");
		String eventEndDate = req.get("endDate");
		
		int result = adminService.updateEvent(eventCode, eventName, eventContent, eventStartDate, eventEndDate);
		
		return result;
	}
	
	//--------------- 관리자 이벤트 변경 (이미지 수정) --------------- //
	@PostMapping("/updateEventUpload")
	public int updateEventUpload(@RequestParam("img") MultipartFile file,
								 @RequestParam("photoCode") String photoCode,
								 @RequestParam("photoPath") String photoPath,
								 @RequestParam("photoReName") String photoReName ) {
		int result = 0;
		
		// 해당 이벤트 이미지 변경
		try {
			result = uploadService.upLoad("U", file, photoCode, photoPath, photoReName);
			
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
			
		}
		
		return result;
	}
	
	//--------------- 관리자 이벤트 삭제 --------------- //
	@DeleteMapping("/deleteEvent")
	public int deleteEvent(@RequestBody HashMap<String, String> req) {
		
		String eventCode = req.get("eventCode"); // 삭제 요청된 이벤트 코드
		String photoCode = req.get("photoCode"); // 삭제 요청된 사진 코드
		String photoPath = req.get("photoPath"); // 삭제 요청된 사진 경로
		String photoReName = req.get("photoReName"); // 삭제 요청된 사진 이름
		
		// 해당 이벤트 이미지 삭제
		int result = adminService.deleteEventPhoto(photoCode, photoPath, photoReName);
		
		// 해당 이벤트 삭제
		if( result == 1 ) { // 이벤트 이미지 삭제 성공 시,
			result = adminService.deleteEvent(eventCode);
			
		}
		
		return result;
	}
	
}
