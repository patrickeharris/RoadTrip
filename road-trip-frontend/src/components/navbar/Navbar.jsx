import React, {useEffect, useState} from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import styles from './navbar.module.css'

const Menu = () => {

    const [logged, setLogged] = useState('false');

    useEffect(() => {
        setLogged(window.localStorage.getItem('loggedIn'));
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
          <div className={styles.navbarBtns}>
              <p><a href="./login">Sign in</a></p>
              <button type="button"><a href="./register">Sign up</a></button>
          </div>
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