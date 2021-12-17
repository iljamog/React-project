import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register.js";
import Login from "./components/login.js";
import UploadFile from "./components/upload.js";
import Header from "./components/header.js";
import HomePage from "./components/homePage.js";
import { Layout } from 'antd';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Header>
                        <Route path="/" element={<Header/>}/>
                    </Header>
                    <Routes>
                        <Route exact path="/home" element={<HomePage/>}/>
                        <Route exact path="/register" element={<Register/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/upload" element={<UploadFile/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;