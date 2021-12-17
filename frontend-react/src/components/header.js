import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './header.css';
import {useEffect, useState} from "react";


function Header() {

    const [header, setHeader] =useState();
    const [user, setUser] = useState();
    
    function logout(){        
        localStorage.clear();
        setUser();
    }

    useEffect(() => {
        setUser(localStorage.getItem("user"));
        if (user) {
            setHeader(<>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="home">Home</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="upload">Image upload</Link></Menu.Item>
                    <Menu.Item key="5" onClick={logout} style={{ marginLeft: 'auto' }}><Link to="home">Logout</Link></Menu.Item>
                    <Menu.Item key="6" ><Link to="about">About author</Link></Menu.Item>
                </Menu>
            </>)
        }else {
            setHeader(<>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="home">Home</Link></Menu.Item>
                    <Menu.Item key="2" style={{ marginLeft: 'auto' }}><Link to="register">Register</Link></Menu.Item>
                    <Menu.Item key="3"style={{ marginLeft: '0%' }}><Link to="login">Login</Link></Menu.Item>
                    <Menu.Item key="6" ><Link to="about">About author</Link></Menu.Item>
                </Menu>
            </>)
        }
      }, [user]);

    return <>{header}</>;
}

export default Header