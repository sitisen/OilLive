import React from 'react';

// import css
import './Footer.css';

const Footer = () => {
    return (
        <footer className='text-center'>
            <div>
                <h6><b>OilLive Inc. 서울특별시 강서구 12동 34로</b></h6>
                <span>대표 : 홍길동</span>
                <span>사업자 등록 번호 : 001-00-123456</span>
                <br></br>
                <span><b>Copyright © {new Date().getFullYear()} OilLive.co.,Ltd. All rights reserved.</b></span>
            </div>
        </footer>
    );
};

export default Footer;