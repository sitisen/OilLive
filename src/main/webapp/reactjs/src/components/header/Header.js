import React from 'react';

// import css
import './Header.css';


const Header = () => {
  return (
    <header>
        <nav>
            <table className='text-center'>
                <tr>
                    <td className='header_Nav_Img'><img alt='logo' src='/images/logo.jpg' width='250' height='100%'/></td>
                    <td className='header_Nav'><span className="nav_Span">차량용품</span></td>
                    <td className='header_Nav'><span className="nav_Span">이용안내</span></td>
                    <td className='header_Nav'><span className="nav_Span">전기차 충전소</span></td>
                    <td className='header_Nav'><span className="nav_Span">이벤트</span></td>
                    <td className='header_Nav_Button'><button type="button" class="btn btn-outline-success">로그인</button></td>
                </tr>
            </table>
        </nav>
    </header>
  );
}

export default Header;