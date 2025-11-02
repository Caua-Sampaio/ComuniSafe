import style from "./Login.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleEnter(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://nongregarious-alan-wintery.ngrok-free.dev/user/login",
                { email, senha }
            );

            setMessage(response.data);
            navigate("/success", { state: { message: "Login concluído com sucesso!" } });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("Credenciais inválidas");
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