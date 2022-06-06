package com.oillive.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oillive.service.PaginationService;
import com.oillive.service.QBoardService;
import com.oillive.service.UploadService;
import com.oillive.service.UsersService;
import com.oillive.vo.PaginationVO;
import com.oillive.vo.PhotoVO;
import com.oillive.vo.QBoardVO;
import com.oillive.vo.QnaVO;

@RestController
@RequestMapping("/qBoard")
@CrossOrigin(origins = "http://localhost:3000")
public class QBoardController {

	@Autowired
	QBoardService qBoardService;
	
	@Autowired
	UploadService uploadService;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
	PaginationService paginationService;
	
	//--------------- 문의작성 --------------- //
	@GetMapping("/qBoardWrite")
	public int qBoardWrite(@RequestParam( name = "userId" ) String userId,
							@RequestParam( name = "title" ) String title,
							@RequestParam( name = "content" ) String content) {
		
		// 결과값 변수 선언
		int result = 0;
		
		// 유저 아이디에 해당하는 유저코드 반환
		int userCode = usersService.getUserCode(userId);
		QBoardVO vo = new QBoardVO();
		
		vo.setUserCode(userCode);
		vo.setQBoardTitle(title);
		vo.setQBoardQContent(content);
		
		result = qBoardService.qBoardWrite(vo);
		return result;
	}
	
	//--------------- 문의 이미지 업로드 --------------- //
	@PostMapping("/qBoardImgUpload")
	public int qBoardImgUpload(@RequestParam("files") MultipartFile file) throws IllegalStateException, IOException  {
		// 업로드
		return uploadService.upLoad("Q", file);
	}
	
	//--------------- 사용자 문의목록 --------------- //
	@GetMapping("/qBoardList")
	public List<QBoardVO> qBoardList(@RequestParam( name = "userId" ) String userId) {
		// 사용자 코드 가져옴
		int userCode = usersService.getUserCode(userId);
		return qBoardService.getQBoardList(userCode);
	}
	
	//--------------- 사용자 문의삭제 --------------- //
	@GetMapping("/deleteQBoard")
	public int deleteQBoard(@RequestParam( name = "qboardCode" ) List<String> qboardCode) {
		return qBoardService.deleteQBoard(qboardCode);
	}
	
	//--------------- 관리자 문의글 개수 --------------- //
	@GetMapping("/qboardCount")
	public HashMap<String,Integer> qboardCount() {
		return qBoardService.qboardCount();
	}
	
	//--------------- 문의목록 페이징 --------------- //
	@GetMapping("/qboardListPage")
	public HashMap<String, Object> qboardListPage( @RequestParam( name = "userId" ) String userId,
			@RequestParam( name = "page" ) int currentPage ) {

		// Pagination 처리 변수
		int totalCount = qBoardService.selectQboardCount(userId); // Qna 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 5;  // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// qna 목록이 담기는 리스트
		List<QnaVO> qboardList = qBoardService.selectQboardList(userId, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("qboardList", qboardList);
		
		return result;
	}
	
	//--------------- 관리자 문의글 삭제 --------------- //
	@GetMapping("/qboardRemove")
	public int qboardRemove(@RequestParam( name = "qboardCode" ) String qboardCode,
			@RequestParam( name = "photoCode" ) String photoCode,
			@RequestParam( name = "photoPath" ) String photoPath,
			@RequestParam( name = "photoReName" ) String photoReName) {
		
		uploadService.deletePhoto(photoCode, photoPath, photoReName);
		
		return qBoardService.qboardRemove(qboardCode);
	}
	
	//--------------- 관리자 문의글 첨부파일 가져옴 --------------- //
	@GetMapping("/getAttached")
	public PhotoVO getAttached(@RequestParam( name = "qboardCode" ) String qboardCode) {
		if(qboardCode == "") {
			return null;
		} else {
			return qBoardService.getAttached(qboardCode);		
		}
	}
}

