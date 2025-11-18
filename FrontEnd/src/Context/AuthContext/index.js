import { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto que vai guardar as infos de autenticação
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Guarda os dados do usuário logado
  const [user, setUser] = useState(null);

  // Indica se ainda tá carregando os dados salvos (localStorage)
  const [loading, setLoading] = useState(true);

  // Quando o app inicia, tenta pegar o usuário salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Se tiver usuário salvo, joga no state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Finaliza o carregamento
    setLoading(false);
  }, []);

  // Função de login — salva o usuário no state e no localStorage
  function login(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  // Função de logout — limpa o state e o localStorage
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // Booleano que indica se o usuário está logado
  const isLoggedIn = !!user;

  return (
    // Disponibiliza tudo isso pra qualquer componente da aplicação
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pra acessar o contexto facilmente
export function useAuth() {
  return useContext(AuthContext);
}
