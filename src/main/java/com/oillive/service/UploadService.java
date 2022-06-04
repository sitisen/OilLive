package com.oillive.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

	//--------------- 파일 업로드 --------------- //
	public int upLoad(String kind, MultipartFile file) throws IllegalStateException, IOException;
	
	//--------------- 업로드된 파일 변경 --------------- //
	public int upLoad(String kind, MultipartFile file, String photoCode, String photoPath, String photoReName) throws IllegalStateException, IOException;	

}
