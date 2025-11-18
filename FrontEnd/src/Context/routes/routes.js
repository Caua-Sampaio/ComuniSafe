import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// Páginas
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import SingUp from "../../Pages/SingUp";
import Emergence from "../../Pages/Emergence";
import Publication from "../../Pages/Publication";
import Perfil from "../../Pages/Perfil";
import MyPosts from "../../Pages/MyPosts";
import NewPublications from "../../Pages/New_Publications";
import Success from "../../Pages/Success";

// Proteção de rota — só entra se estiver logado
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Evita piscar a tela antes de descobrir se tem usuário salvo
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se tiver user → libera | Se não → manda pro login
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/emergencia" element={<Emergence />} />
        <Route path="/publicacoes" element={<Publication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/success" element={<Success />} />

        {/* Rotas privadas */}
        <Route
          path="/nova-publicacao"
          element={
            <PrivateRoute>
              <NewPublications />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/meus-posts"
          element={
            <PrivateRoute>
              <MyPosts />
            </PrivateRoute>
          }
        />

        {/* Se cair em rota inexistente → volta pra Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
