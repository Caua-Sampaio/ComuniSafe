import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "../../routes/routes.js";
import { AuthProvider } from "../AuthContext/index.js";
import "../../index.css"; // ⚠️ importante importar o CSS global



function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
