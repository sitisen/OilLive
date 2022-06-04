package com.oillive.dao;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.PhotoVO;

@Mapper
public interface UploadDao {

	// 문의하기 이미지 저장
	public int upLoadQ(PhotoVO vo);

	// 상품등록 이미지 저장
	public int upLoadG(PhotoVO vo);
	
	// 이벤트 등록 이미지 저장
	public int upLoadE(PhotoVO vo);
	
	// 업로드된 파일 변경
	public int upLoadU(PhotoVO vo);

}
