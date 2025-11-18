import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "../routes/routes.js";
import { AuthProvider } from "../AuthContext/index.js";
import "../../index.css"; // ⚠️ importa o CSS global da aplicação



function App() {
  return (
    // Envolve todas as rotas com o AuthProvider para permitir login/logout no app inteiro
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

// Renderiza o app dentro da div com id="root" no index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* O StrictMode ajuda a detectar problemas no desenvolvimento */}
    <App />
  </React.StrictMode>
);
