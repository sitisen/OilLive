package com.oillive.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

	//--------------- 파일 업로드 --------------- //
	public int upLoad(String string, MultipartFile file) throws IllegalStateException, IOException;

}
