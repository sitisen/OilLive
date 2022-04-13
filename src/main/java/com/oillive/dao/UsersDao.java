package com.oillive.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UsersDao {
	
	//--------------- 로그인 --------------- //
	public int login(HashMap<String, String> map);
}
