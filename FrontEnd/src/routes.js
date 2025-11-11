import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// importa todas as páginas normais
import Emergence from "./Pages/Emergence";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/SingUp";
import Perfil from "./Pages/Perfil";
import Publication from "./Pages/Publication";
import MyPosts from "./Pages/MyPosts";
import NewPublications from "./Pages/New_Publications";
import Success from "./Pages/Success";

// função auxiliar que verifica se o usuário está logado
function isLoggedIn() {
    // se houver token salvo no localStorage, retorna true
    return !!localStorage.getItem("token");
}

// componente que protege uma rota
function PrivateRoute({ children }) {
    // se estiver logado, mostra o conteúdo da rota
    // se não, redireciona para o /login
    return isLoggedIn() ? children : <Navigate to="/login" />;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* rota pública (qualquer um pode acessar) */}
                <Route path="/" element={<Home />} />

                {/* rotas públicas */}
                <Route path="/emergencia" element={<Emergence />} />
                <Route path="/publicacoes" element={<Publication />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sing-up" element={<SingUp />} />
                <Route path="/success" element={<Success />} />

                {/* rotas protegidas (só acessa se estiver logado) */}
                <Route
                    path="/nova-publicacao"
                    element={
                        <PrivateRoute>
                            <NewPublications />
                        </PrivateRoute>
                    }
                />
                {/* rotas protegidas (só acessa se estiver logado) */}
                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    }
                />
                {/* rotas protegidas (só acessa se estiver logado) */}
                <Route
                    path="/meus-posts"
                    element={
                        <PrivateRoute>
                            <MyPosts />
                        </PrivateRoute>
                    }
                />

                {/* se digitar uma rota inexistente, redireciona pra home */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;