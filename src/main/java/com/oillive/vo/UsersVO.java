package com.oillive.vo;

import java.util.Date;

import lombok.Data;

@Data
public class UsersVO {

	private int userCode;		// 회원코드
	private String userId;		// 아이디
	private String userPwd;		// 비밀번호
	private String userName;	// 이름
	private String userPhone;	// 휴대전화
	private String userGender;	// 성별
	private String userBirth;	// 생년월일
	private String userAddress;	// 주소
	private String userEmail;	// 이메일
	private Date userDate;		// 가입일
	private String userStatus;	// 상태
	
}
