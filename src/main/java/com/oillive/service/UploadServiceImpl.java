package com.oillive.service;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.swing.filechooser.FileSystemView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oillive.dao.UploadDao;
import com.oillive.vo.PhotoVO;

@Service
public class UploadServiceImpl implements UploadService{

	@Autowired
	UploadDao uploadDao;

	// 경로 변수
	@Autowired ServletContext servletContext;
	
	//--------------- 파일 업로드 --------------- //
	@Override
	public int upLoad(String kind, MultipartFile file) throws IllegalStateException, IOException {

		// 파일 업로드 로직
		PhotoVO vo = new PhotoVO();
		
		// 실제 저장장소
		String rootpath = servletContext.getRealPath("/reactjs").toString();
		String realpath = rootpath + "\\public\\images\\uploads\\" + file.getOriginalFilename();
		
		File fe = new File(realpath);
		
		file.transferTo(fe);
		
		
		
		switch(kind) {
//			case "Q" :	return uploadDao.upLoadQ(file);
//						break;
//			case "G" :	return uploadDao.upLoadG(file);
//						break;
//			case "E" :	return uploadDao.upLoadE(file);
//						break;
		}
	
		return 0;
	}
}
