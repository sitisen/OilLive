package com.oillive.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oillive.service.QBoardService;
import com.oillive.service.UploadService;
import com.oillive.service.UsersService;
import com.oillive.vo.QBoardVO;

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
}

