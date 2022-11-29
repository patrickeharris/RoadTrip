import React, {useEffect, useState} from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import styles from './navbar.module.css'
import {myAxios} from "../../util/helper";
/*const Menu = () => {

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
*/
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [logged, setLogged] = useState('false');
    const [dropdownOpen, setdropdownOpen] = useState(false);

    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
        console.log(window.sessionStorage.getItem('loggedIn'))
    })

    async function logOut() {
        setLogged('false');
        window.sessionStorage.setItem('loggedIn', 'false');
        window.sessionStorage.setItem('spotifyLogged', 'false');
        await myAxios.get("/logout");
    }

  return (
      <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      <button type="button"
                              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                              aria-controls="mobile-menu" aria-expanded="false">
                          <span className="sr-only">Open main menu</span>
                          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                          </svg>
                          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                      </button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                          <img className="block h-8 w-auto lg:hidden"
                               src="/static/logo.png"
                               alt="Your Company" />
                              <img className="hidden h-8 w-auto lg:block"
                                   src="/static/logo.png"
                                   alt="Your Company" />
                      </div>
                      <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4">
                              <a href="./" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                 aria-current="page">Home</a>

                              <a href="./#about"
                                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</a>

                              {
                                  logged === 'true' ?
                                      <a href="/trip-dashboard"
                                         className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Trip Dashboard</a> :
                                      <a href="/login"
                                         className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Trip Dashboard</a>
                              }
                              <a href="./#footer"
                                 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
                          </div>
                      </div>
                  </div>
                  {
                      logged !== 'true' ?
                  <><button
                      className="px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition"><a href="./login">Login</a>
                  </button>
                  <button
                      className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition"><a href="./register">Register</a>
                  </button></> :
                  <div
                      className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <button type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">View notifications</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                               stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                          </svg>
                      </button>
                      <div class="relative ml-3">
                          <div>
                              {dropdownOpen ?
                              <button type="button" onClick={() => setdropdownOpen(!dropdownOpen)} class="flex rounded-full bg-gray-800 text-sm outline-none ring-2 ring-white ring-offset-1 ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                  <span class="sr-only">Open user menu</span>
                                  <img class="h-8 w-8 rounded-full" src="/static/profile.webp" alt=""></img>
                              </button> :
                                  <button type="button" onClick={() => setdropdownOpen(!dropdownOpen)}
                                          className="flex rounded-full bg-gray-800 text-sm"
                                          id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                      <span className="sr-only">Open user menu</span>
                                      <img className="h-8 w-8 rounded-full" src="/static/profile.webp" alt=""></img>
                                  </button>}
                          </div>
                          {dropdownOpen ?
                          <div class={"absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                              <a href="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                              <a href="/logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                          </div> : <></>}
                      </div>
                  </div>}
              </div>
          </div>
          <div class="sm:hidden" id="mobile-menu">
              <div class="space-y-1 px-2 pt-2 pb-3">
                  <a href="./" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</a>

                  <a href="./#about" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</a>

                  {
                      logged === 'true' ?
                          <a href="/trip-dashboard"
                             class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Trip
                              Dashboard</a> :
                          <a href="/login"
                             className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Trip
                              Dashboard</a>
                  }

                  <a href="./#footer" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
              </div>
          </div>
      </nav>
  )
}

export default Navbar