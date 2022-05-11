package com.oillive.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
import com.oillive.vo.PhotoVO;
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
	public int qBoardImgUpload(@RequestParam(value="files", required=false) MultipartFile[] files) throws IllegalStateException, IOException {
		
		// 결과값 변수 선언
		int result = 0;
		
		for (MultipartFile mf : files) {
			if(!mf.isEmpty()) {
				PhotoVO vo = new PhotoVO();
				// 수정파일명
				vo.setPhotoReName(UUID.randomUUID().toString());
				
				// 경로
				String filepath = "C:\\workspace\\OilLive\\src\\main\\webapp\\reactjs\\public\\images\\";
				vo.setPhotoPath(filepath);
				
				// 원본 파일명
				String originFileName = mf.getOriginalFilename(); 
				vo.setPhotoName(originFileName);
				
				
			}
		}
		
		
		
		return result;
	}
}

