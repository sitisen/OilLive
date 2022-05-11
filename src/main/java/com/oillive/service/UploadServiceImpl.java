package com.oillive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.UploadDao;

@Service
public class UploadServiceImpl implements UploadService{

	@Autowired
	UploadDao uploadDao;

	//--------------- 파일 업로드 --------------- //
	@Override
	public int upLoad(String kind, String file) {

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
