package com.oillive.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminDao {

	// 관리자 로그인 비밀번호
	public String getMpassword(String userId);

}
