
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuBar from '/icons/menu.png';
import downArrow from '/icons/down-arrow.png';
import profilePic from '/images/profilepic.jpg';
import css from './NavigationBar.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../../main';

let NavigationBar = ({ toogleMenu, setToggleMenu, page }) => {
  let [menuDisplay, setMenuDisplay] = useState(false);
  let [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') || false);
  let [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  let [orders, setOrders] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false)
  }

  const getAllOrders = async () => {
    navigate("/orders")
  }

  const navigateCart = () => {
    navigate("/checkout")
  }
  return (
    <div className={css.navbar}>
      <img className={css.menuBar} src={menuBar} alt='menu bar' onClick={() => setToggleMenu(val => !val)} />
      <div className={css.navbarInner}>
        <div className={css.leftSide}></div>
        <div className={css.rightSide}>
          {loggedIn ? (
            <div className={css.menuItem}>
              <div className={css.profile} onClick={() => setMenuDisplay(val => !val)}>
                <img src={profilePic} alt="profile pic" className={css.profilePic} />
                <div className={css.profileName}>Profile</div>
                <img src={downArrow} alt="arrow" className={css.arrow} />
              </div>
              <div className={css.menu} style={{ display: menuDisplay ? "block" : "" }}>
                <div className={css.menuItemLinkTxt}>
                  <div className={css.menuItemLink} onClick={logoutHandler}>Logout</div>
                  <div className={css.menuItemLink} onClick={getAllOrders}>Order History</div>
                  <div className={css.menuItemLink} onClick={navigateCart}>Go To Cart</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div><Link className={css.menuItem} to='/login'>Login</Link></div>
              <div><Link className={css.menuItem} to='/register'>Sign up</Link></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
