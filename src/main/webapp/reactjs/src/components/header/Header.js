import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import css
import HeaderStyle from './Header.module.css';


const Header = () => {

  var navigate = useNavigate();

  var userId = sessionStorage.getItem('userId');

  const logout = () => {
    sessionStorage.removeItem('userId');
    navigate('/', {replace:true});
  }

  const login = () => {
    navigate('/users/login', {replace:true});
  }

  return (
    <header className={HeaderStyle['header-layout']}>
      <div className='container'>
        <nav>
            <table className='text-center'>
              <tbody>
                <tr>
                  <td className={HeaderStyle['header-nav-img']}><Link to='/'><img alt='logo' src='/images/logo/logo.jpg' width='230' height='100%'/></Link></td>
                  <td className={HeaderStyle['header-nav']}><Link className={HeaderStyle['header-link']} to='/goods/goodslist'><span className={HeaderStyle['nav-span']}>차량용품</span></Link></td>
                  <td className={HeaderStyle['header-nav']}><Link className={HeaderStyle['header-link']} to='/qna/qna'><span className={HeaderStyle['nav-span']}>이용안내</span></Link></td>
                  <td className={HeaderStyle['header-nav']}><span className={HeaderStyle['nav-span']}>전기차 충전소</span></td>
                  <td className={HeaderStyle['header-nav']}><span className={HeaderStyle['nav-span']}>이벤트</span></td>
                  <td className={HeaderStyle['header-nav-button']}>
                    {
                      userId !== null 
                      ? <><Link to='/users/myPage'><span className={HeaderStyle['header-span']}>{userId}</span></Link>님&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type='button' className='btn btn-outline-success' onClick={logout}>로그아웃</button></>
                      : <button type='button' className='btn btn-outline-success' onClick={login}>로그인</button>
                      }
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