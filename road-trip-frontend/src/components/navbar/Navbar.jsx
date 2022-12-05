import React, {useEffect, useState} from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import styles from './navbar.module.css'
import {myAxios} from "../../util/helper";

const Menu = () => {

    const [logged, setLogged] = useState('false');

    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
    })

    return (
        <>
            <p><a href="./">Home</a></p>
            <p><a href="./#about">About Us</a></p>
            {
                logged === 'true' ?
                    <p><a href="/trip-dashboard">Trip Dashboard</a></p> :
                    <p><a href="/login">Trip Dashboard</a></p>
            }
            {
                logged === 'true' ?
                    <p><a href="/profile">Profile</a></p> :
                    <p><a href="/login">Profile</a></p>
            }
            <p><a href="./#footer">Contact Us</a></p>
        </>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [logged, setLogged] = useState('false');

    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
        console.log(window.sessionStorage.getItem('loggedIn'))
    })

    async function logOut() {
        setLogged('false');
        window.sessionStorage.setItem('loggedIn', 'false');
        window.sessionStorage.setItem('spotifyLogged', 'false');
        window.sessionStorage.setItem('token', 'null');
    }

  return (
      <div className={styles.navbar}>
          <div className={styles.navbarLinks}>
              <div className={styles.navbarLinksLogo}>
                  <img src="/static/logo.png" alt="logo"/>
              </div>

              <div className={styles.navbarLinksContainer}>
                  <Menu />
              </div>
          </div>
          {
              logged === 'false' ?
                  <div className={styles.navbarBtns}>
                      <p><a href="./login">Sign in</a></p>
                      <button type="button"><a href="./register">Sign up</a></button>
                  </div>
                  :
                  <div className={styles.navbarBtns}>
                      <button type="button" onClick={logOut}>Logout</button>
                  </div>
          }
          <div className={styles.navbarMenu}>
              {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/>
                  : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
              }
              {toggleMenu && (
                  <div className={styles.navbarMenuContainer}>
                      <div>
                          <Menu />
                          <div className={styles.navbarMenuContainerLinksBtns}>
                              <p>Sign in</p>
                              <button type="button"><a href="./register">Sign up</a></button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
  )
}

export default Navbar