package com.oillive.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface OrdersDao {
	
	//--------------- 결제 내역 추가 --------------- //
	public int insertOrders(HashMap<String, String> params);
	
}
