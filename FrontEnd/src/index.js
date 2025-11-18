import React from 'react'; // Importa o React para gerenciar a interface
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM para renderizar a aplicação no navegador
import './index.css'; // Estilos globais da aplicação
import App from './Context/App'; // Componente principal da aplicação
import { AuthProvider } from './Context/AuthContext'; // Importa o provider de autenticação

// Cria o ponto de montagem da aplicação, pegando a div root do HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode> 
    {/* StrictMode ajuda a detectar problemas e boas práticas durante o desenvolvimento */}
    
    <AuthProvider> 
      {/* Envolve toda a aplicação com o AuthProvider, 
          permitindo que todos os componentes usem o contexto de autenticação */}
      
      <App /> {/* Renderiza o componente principal da aplicação */}
    </AuthProvider>
  </React.StrictMode>
);

// Comentário padrão do React sobre medir performance (não interfere no app)
