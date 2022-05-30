package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.EventVO;

@Mapper
public interface EventDao {
	
	//--------------- 이벤트 개수 조회 (페이징) --------------- //
	public int selectEventCount(HashMap<String, String> param);
	
	//--------------- 이벤트 목록 조회 --------------- //
	public List<EventVO> selectEventList(HashMap<String, String> param);

}
