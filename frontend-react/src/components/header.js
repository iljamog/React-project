
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#FFFFFF",
  },
  menuButton: {
    fontFamily: 'forma-djr-text',
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '.15em',
    lineHeight: '0em',
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000000"
  }
}));

const loggedInHeaders = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Image Upload",
      href: "/upload",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Log out",
      href: "/logout",
    }
]
const headersData = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Login",
      href: "/login",
    },
  ];
export default function Header() {
  const { header, menuButton, toolbar } = useStyles();
  const [user, setUser] = useState();
    

    

  useEffect(() => {
    let email;
    let userData;
    setUser(localStorage.getItem("user"));
    if(user){
      userData = JSON.parse(user)
      email = userData.email
    }
    let elements = document.getElementsByTagName('a');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if(element.href === 'http://localhost:3000/logout'){
        element.addEventListener('click', (e) => {logOut(e)});
      }
      if(element.href === 'http://localhost:3000/upload'){
        if (email === 'admin@admin.ee') {
          console.log('Welcome Admin')
        }else{
          element.remove();
        }
          
        
      }
      
    }
    
  }, [user]);

  function logOut(e) {
    e.preventDefault();
    localStorage.clear()
    setUser()
 }
  
  const displayDesktop = () => {
    return <Toolbar id='headerButtons' className={toolbar} >
        <div id='logo' className={menuButton} style={{alignItems: "center !important"}}>{'Big Burps Pennywhistle'}</div>
        <div>{getMenuButtons()}</div>
        </Toolbar>;
  };
  const getMenuButtons = () => {
      if(user){
        return loggedInHeaders.map(({ label, href }) => {
            return (
              <Button
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                  component: RouterLink,
                  className: menuButton
                }}
              >
                {label}
              </Button>
            );
          });
      }else{
        return headersData.map(({ label, href }) => {
            return (
              <Button
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                  component: RouterLink,
                  className: menuButton
                }}
              >
                {label}
              </Button>
            );
          });
      }
  };

  return (
    <header>
      <AppBar className={header} >{displayDesktop()}</AppBar>
    </header>
  );
}