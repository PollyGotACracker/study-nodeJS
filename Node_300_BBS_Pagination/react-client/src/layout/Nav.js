import { NavLink } from "react-router-dom";
import "../css/MainNav.css";

const MainNav = () => {
  return (
    <nav className="main">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/notice">공지사항</NavLink>
        </li>
        <li>
          <NavLink to="/bbs/1">자유게시판</NavLink>
        </li>
        <li className="main nav login">
          <NavLink to="/user/login">로그인</NavLink>
        </li>
        <li>
          <NavLink to="/user/join">회원가입</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
