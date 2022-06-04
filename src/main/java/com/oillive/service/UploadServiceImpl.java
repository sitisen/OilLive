package com.oillive.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletContext;

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

		// 파일 DB에 저장할 VO 객체생성
		PhotoVO vo = new PhotoVO();
		
		// 실제 저장장소
		String rootpath = servletContext.getRealPath("/reactjs").toString();
		String realpath = rootpath + "\\public\\images\\uploads";
		
		// 중복방지 함수선언
		Date date = new Date();
		StringBuilder sb = new StringBuilder();
		
		sb.append(date.getTime());
		sb.append(file.getOriginalFilename());
		
		File fe = new File(realpath);
		File dest = new File(realpath + "\\" + sb.toString());
		
		// 폴더가 존재하지 않을때 폴더생성
		if(!fe.exists()) {
			fe.mkdir();
		// 폴더가 존재하면 파일 생성
		} else {
	        file.transferTo(dest);
		}
		// react path 변수 선언
		String reactPath = "\\images\\uploads\\";
		vo.setPhotoPath(reactPath);
		
		vo.setPhotoName(file.getOriginalFilename().toString());	// 원본파일명
		vo.setPhotoReName(sb.toString());						// 수정파일명
		
		// 코드별 이미지 업로드
		switch(kind) {
			case "Q" :	return uploadDao.upLoadQ(vo);
			case "G" :	return uploadDao.upLoadG(vo);
			case "E" :	return uploadDao.upLoadE(vo);
			default : return 0;
		}
		
	}

	//--------------- 업로드된 파일 변경 --------------- //
	@Override
	public int upLoad(String kind, MultipartFile file, String photoCode) throws IllegalStateException, IOException {
		
		// 파일 DB에 저장할 VO 객체생성
		PhotoVO vo = new PhotoVO();
		
		// 실제 저장장소
		String rootpath = servletContext.getRealPath("/reactjs").toString();
		String realpath = rootpath + "\\public\\images\\uploads";
		
		// 중복방지 함수선언
		Date date = new Date();
		StringBuilder sb = new StringBuilder();
		
		sb.append(date.getTime());
		sb.append(file.getOriginalFilename());
		
		File fe = new File(realpath);
		File dest = new File(realpath + "\\" + sb.toString());
		
		// 폴더가 존재하지 않을때 폴더생성
		if(!fe.exists()) {
			fe.mkdir();
		// 폴더가 존재하면 파일 생성
		} else {
	        file.transferTo(dest);
		}
		// react path 변수 선언
		String reactPath = "\\images\\uploads\\";
		vo.setPhotoPath(reactPath);
		
		vo.setPhotoCode(Integer.parseInt(photoCode));			// 사진 코드
		vo.setPhotoName(file.getOriginalFilename().toString());	// 원본파일명
		vo.setPhotoReName(sb.toString());						// 수정파일명
		
		// 코드별 이미지 업로드
		switch(kind) {
			case "U" :	return uploadDao.upLoadU(vo);
			default : return 0;
		}
	}
}
