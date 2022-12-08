import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
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
const Notifs = () => {

    const [notifs, setNotifs] = useState([])
    const [test, setTest] = useState(false)

    async function getNotifs(){
        if(notifs.length > 0){

        }
        const response = (await myAxios.get("/get/notifications", {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        })).data;
        const response1 = (await myAxios.get("/register/curUser", {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        })).data;
        for (let i = 0; i < response.length; i++) {
            if(response1.user_id === response[i].user){
                if(notifs.findIndex(element => '' + element.notif_id === '' + response[i].notif_id) === -1) {
                    notifs.push(response[i])
                    console.log("push")
                } else {
                    console.log("skip")
                }
            }
        }
        setNotifs(notifs)
        setTest(true)
    }

    function deleteNotif(e){
        setTest(false)
        myAxios.delete("/remove/notification", {
            params: {notif_id: e.target.value},
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        }).then(getNotifs())
    }

    useEffect(() => {
        getNotifs();
    })

    return <div className="flex flex-col items-center max-h-64 overflow-scroll overflow-hidden min-w-64 max-w-64 bg-opacity-40">{test && notifs.length > 0 ? notifs.map((notif) => {
        return <div className="bg-purple-500 w-full bg-opacity-40 mb-4 w-[80%]">
            <button value={notif.notif_id} onClick={deleteNotif} className="float-right pr-4 pt-2">X</button>
            <p className="w-full font-bold font-sans text-xs text-left pl-4 pt-2">{notif.timestamp}</p>
            <p className="w-full font-sans text-md text-center pb-2">{notif.notification}</p>
            </div>}) : <p className="w-full font-sans text-center">No Notifications Found</p>}</div>
}

const Navbar = () => {
    const [logged, setLogged] = useState('false');
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [notif, setNotifOpen] = useState(false);
    const router = useRouter();
    const [test, setTest] = useState(null);
    const [about, setAbout] = useState(false);

    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
        console.log(window.sessionStorage.getItem('loggedIn'))
        if(router.pathname === "/") {
            setTest(document.getElementById('about'));
            window.addEventListener('scroll', handleScroll);
        }
    })

    async function logOut() {
        setLogged('false');
        window.sessionStorage.setItem('loggedIn', 'false');
        window.sessionStorage.setItem('spotifyLogged', 'false');
        window.sessionStorage.setItem('token', 'null');
    }

    function checkVisible( elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return rect.bottom < 900;
    }

    function handleScroll(event) {
        if(test !== null){
            if(checkVisible(test)){
                if(!about){
                    setAbout(true)
                }
            }
            else{
                if(about){
                    setAbout(false)
                }
            }
        }
    }

    async function getNotifs(){
        const response = (await myAxios.get("/get/notifications", {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        })).data;
        console.log(response)
    }

  return (
      <nav className="sticky top-0 w-full z-20 bg-purple-600 bg-opacity-60 shadow-lg border-b border-opacity-10 border-gray-400">
          <div className="w-full px-2 sm:px-6 lg:px-8">
              <div className="relative flex flex-row h-16 items-center justify-between w-full">
                  <div className="flex items-center sm:hidden">
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
                              {router.pathname === "/" && !about ?
                              <a href="./" className="font-sans font-bold bg-white text-purple-700 px-3 py-2 font-bold rounded-md text-sm font-medium"
                                 aria-current="page">Home</a>
                                  :
                                  <a href="./" className="font-sans font-bold text-gray-300 hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium"
                                     aria-current="page">Home</a>}

                              {test && about ? <a href="./#about"
                                                               className="bg-white font-bold text-purple-700 px-3 py-2 font-bold rounded-md text-sm font-medium">About Us</a>:
                                  <a href="./#about"
                                     className="font-sans text-gray-300 font-bold hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium">About Us</a>}

                              {
                                  logged === 'true' ?
                                      router.pathname === "/trip-dashboard" ?
                                      <a href="/trip-dashboard"
                                         className="font-sans font-bold bg-white text-purple-700 px-3 py-2 font-bold rounded-md text-sm font-medium">Trip Dashboard</a>:
                                          <a href="/trip-dashboard"
                                             className="font-sans font-bold text-gray-300 hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium">Trip Dashboard</a>:
                                      <a href="/login"
                                         className="font-sans font-bold text-gray-300 hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium">Trip Dashboard</a>
                              }
                              {
                                  logged === 'true' ?
                                      router.pathname === "/ratings" ?
                                          <a href="/ratings"
                                             className="font-sans font-bold bg-white text-purple-700 px-3 py-2 font-bold rounded-md text-sm font-medium">Ratings</a>:
                                      <a href="/ratings"
                                        className="font-sans font-bold text-gray-300 hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium">Ratings</a>
                                      : <a href="/login"
                                           className="font-sans font-bold text-gray-300 hover:bg-white hover:text-purple-700 font-bold px-3 py-2 rounded-md text-sm font-medium">Ratings</a>
                              }
                          </div>
                      </div>
                  </div>
                  {
                      logged !== 'true' ?
                  <><button
                      className="font-sans font-bold px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 font-bold hover:bg-red-600 transition"><a href="./login">Login</a>
                  </button>
                  <button
                      className="font-sans font-bold px-4 py-2 rounded-r-xl bg-neutral-50 font-bold hover:bg-neutral-100 text-purple-700 transition"><a href="./register">Register</a>
                  </button></> :
                  <div
                      className="flex flex-end">
                      <div>
                      <button onClick={() => setNotifOpen(!notif)} type="button"
                              className="rounded-full bg-inherit hover:bg-white p-1 text-white hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">View notifications</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                               stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                          </svg>
                      </button>
                      </div>
                      {notif ?
                          <div class={"absolute right-4 z-10 mt-12 w-64 origin-top-right bg-opacity-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                              <Notifs />
                          </div> : <></>}
                      <div class="relative ml-3">
                          <div>
                              {dropdownOpen ?
                              <button type="button" onClick={() => setdropdownOpen(!dropdownOpen)} class="flex rounded-full bg-transparent text-sm text-white outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                  <span class="sr-only">Open user menu</span>
                                  <div className="rounded-full bg-inherit hover:fill-purple-700 hover:bg-white mt-1 w-6 h-6 bg-transparent fill-white text-white">
                                      <svg version="1.1" id="Capa_1" x="0px" y="0px"
                                           viewBox="0 0 56 56">
                                          <g>
                                              <path d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M28,54C13.663,54,2,42.336,2,28
                                                        S13.663,2,28,2s26,11.664,26,26S42.337,54,28,54z"/>
                                              <path d="M40,16H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,16,40,16z"/>
                                              <path d="M40,27H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,27,40,27z"/>
                                              <path d="M40,38H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,38,40,38z"/>
                                          </g>
                                      </svg>
                                  </div>
                              </button> :
                                  <button type="button" onClick={() => setdropdownOpen(!dropdownOpen)}
                                          className="flex rounded-full bg-transparent text-white text-sm"
                                          id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                      <span className="sr-only">Open user menu</span>
                                      <div className="rounded-full hover:fill-purple-700 bg-inherit hover:bg-white mt-1 w-6 h-6 bg-transparent fill-white text-white">
                                          <svg version="1.1" id="Capa_1" x="0px" y="0px"
                                               viewBox="0 0 56 56">
                                              <g>
                                                  <path d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M28,54C13.663,54,2,42.336,2,28
                                                        S13.663,2,28,2s26,11.664,26,26S42.337,54,28,54z"/>
                                                  <path d="M40,16H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,16,40,16z"/>
                                                  <path d="M40,27H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,27,40,27z"/>
                                                  <path d="M40,38H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,38,40,38z"/>
                                              </g>
                                          </svg>
                                      </div>
                                  </button>}
                          </div>
                          {dropdownOpen ?
                          <div class={"absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                              <a href="/profile" class="w-44 font-sans block py-2 text-sm text-gray-700 hover:bg-gray-200 justify-center flex" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                              <button onClick={ () => {
                                  window.sessionStorage.setItem('loggedIn', 'false');
                                  window.sessionStorage.setItem('token', null);
                                  window.location.replace("/");
                              }} class="font-sans block w-44 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
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
                  <a href="/ratings"
                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ratings</a>
              </div>
          </div>
      </nav>
  )
}

export default Navbar