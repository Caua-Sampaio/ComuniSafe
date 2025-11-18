import style from "./Login.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext"; // ⭐ ADICIONADO
import { API_URL } from "../../Context/Config";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth(); // ⭐ USANDO O CONTEXTO

    async function handleEnter(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/user/login`,
                { email, senha },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }
            );

            // ⭐ AGORA O LOGIN CENTRALIZADO
            login(response.data.user, response.data.token);

            setMessage("Login realizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro no login:", error);

            if (error.response?.status === 401) {
                setMessage("Credenciais inválidas");
            } else if (error.response?.status === 404) {
                setMessage("Usuário não encontrado");
            } else {
                setMessage("Erro no servidor");
            }
        }
    }

    return (
        <div className={style.body}>
            <Header />

            <main>
                <section className={style.sobre}>
                    <h1 className={style.title}>Login</h1>

                    <div className={style.login}>
                        <form onSubmit={handleEnter}>
                            <div className={style.inputBox}>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)}
                                className={style.inputSingle}
                                required
                            />

                            <button type="submit" className="btn">
                                Entrar
                            </button>
                        </form>

                        {message && <p className={style.message}>{message}</p>}

                        <div className={style.centralizar}>
                            <Link to="/sing-up" className={style.linkBTN}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
