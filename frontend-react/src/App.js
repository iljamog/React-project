import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register.js";
import Login from "./components/login.js";
import Header from "./components/header.js";
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
                        <Route exact path="/register" element={<Register/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;