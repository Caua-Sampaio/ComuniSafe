import { BrowserRouter, Route, Routes } from "react-router-dom";
import Emergence from "./Pages/Emergence";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/SingUp";
import Publication from "./Pages/Publication";
import NewPublications from "./Pages/New_Publications";
import Success from "./Pages/Success";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/emergencia" element={<Emergence />}></Route>
                <Route path="/publicacoes" element={<Publication />}></Route>
                <Route path="/nova-publicacao" element={<NewPublications />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/sing-up" element={<SingUp />}></Route>
                <Route path="/success" element={<Success />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;