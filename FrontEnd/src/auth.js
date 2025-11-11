// src/auth.js

// verifica se há um token salvo
export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

// remove o token ao fazer logout
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}