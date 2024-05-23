import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const menuRef = useRef(null);

  const clickHandler = () => {
    setClick(false);
  };

  const exitHandler = () => {
    document.cookie = "accessToken=";
    document.cookie = "refreshToken=";
    refetch();
    clickHandler();
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} alt="Logo" />
        </Link>
        <span>
          <img src="location.svg" alt="Location" />
          <p>تهران</p>
        </span>
      </div>

      <div className={styles.menu}>
        <div ref={menuRef}>
          <span onClick={() => setClick(!click)}>
            <img src="profile.svg" alt="Profile" />
            <p>دیوار من</p>
          </span>
          {click && (
            <ul>
              {data.data?.role === "ADMIN" ? (
                <>
                  <Link to="/admin" onClick={clickHandler}>
                    <li>پنل ادمین</li>
                  </Link>
                  <Link to="/" onClick={clickHandler}>
                    <li>صفحه اصلی</li>
                  </Link>
                  <Link to="/dashboard" onClick={clickHandler}>
                    <li>افزودن اگهی</li>
                  </Link>
                  <li onClick={exitHandler}>خروج</li>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={clickHandler}>
                    <li>ورود</li>
                  </Link>
                  <Link to="/" onClick={clickHandler}>
                    <li>صفحه اصلی</li>
                  </Link>
                  <Link to="/dashboard" onClick={clickHandler}>
                    <li>افزودن اگهی</li>
                  </Link>
                  <li onClick={exitHandler}>خروج</li>
                </>
              )}
            </ul>
          )}
        </div>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
