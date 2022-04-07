import React from 'react';

// import css
import './Header.css';


const Header = () => {
  return (
    <header>
      <div className='container'>
        <nav>
            <table className='text-center'>
              <tbody>
                <tr>
                    <td className='header_Nav_Img'><img alt='logo' src='/images/logo.jpg' width='230' height='100%'/></td>
                    <td className='header_Nav'><span className="nav_Span">차량용품</span></td>
                    <td className='header_Nav'><span className="nav_Span">이용안내</span></td>
                    <td className='header_Nav'><span className="nav_Span">전기차 충전소</span></td>
                    <td className='header_Nav'><span className="nav_Span">이벤트</span></td>
                    <td className='header_Nav_Button'>
                      <span className='stst'>rlacjfrl</span>&nbsp;님 환영합니다.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="button" className="btn btn-outline-success">로그아웃</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </nav>
      </div>
    </header>
  );
}

export default Header;