package com.oillive.vo;

import lombok.Data;

@Data
public class CardVO {

	private int cardCode;		// 카드코드
	private int userCode;		// 회원코드
	private String cardCompany;	// 카드사
	private String cardNum;		// 카드번호
	private String cardPwd;		// 카드비밀번호
	private String cardCvc;		// CVC번호
	private String cardDate;	// 유효기간
	
}
