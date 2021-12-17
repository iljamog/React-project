import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './header.css';


function Header() {
    return (<>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="home">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="register">Register</Link></Menu.Item>
            <Menu.Item key="3"><Link to="login">Login</Link></Menu.Item>
            <Menu.Item key="4"><Link to="upload">Image upload</Link></Menu.Item>
        </Menu>
    </>)
}

export default Header