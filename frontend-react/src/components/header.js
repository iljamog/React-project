
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
    setUser(localStorage.getItem("user"));
  }, [user]);

  const displayDesktop = () => {
    return <Toolbar className={toolbar}>
        <div className={menuButton}>{'Big Burps Pennywhistle'}</div>
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
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}