# OilLive README
## 주요기능

- ### 유가 정보
  - 전체 유가비교 & 지역별 유가비교
  - 지역별 상표 유가 추이
  - 지역별 최저가 주유소 TOP 10

- ### 쇼핑몰
  - 차량관련 상품목록
  - 차량관련 상품구매

- ### 전기차 충전소
  - 지역별 전기차 충전소 위치
  - 전기차 충전소 상태

<br/>

## 개발도구
- #### Node.js v16.14.2
- #### JDK v1.8
- #### React v17.0 (CRA)
- #### Spring Boot v4.14.0
- #### MyBatis v2.2.2
- #### VSCode Studio v1.68
- #### Eclipse v4.20

<br/>

## 설치
    
- npm update
- gradle update
 
<br/>

## 구현된 API

### 유가 정보 API   

- GET /users/home

### 전기차 충전소 API

- GET /electriccar/electriccar

### 휴대전화 및 이메일 인증 API  

- GET /users/sendSMS/{phoneNum}
- POST /users/sendEmail
- POST /users/findIdPhone
- POST /users/findIdEmail

### 주소찾기 API  

- import DaumPostcode from 'react-daum-postcode'

### 지도 API

- <script type="text/javascript" src="//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ClientID&submodules=geocoder" />
- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APPKEY" />

<br/>

## 유의사항
- ### 실행환경
  - Chrome
  - Resolution : 1920x1080
  - Zoom : 100%

- ### 휴대전화 인증
  - 과금방지를 위해, 개발자 도구(F12)의 콘솔창에서 인증번호 확인가능
