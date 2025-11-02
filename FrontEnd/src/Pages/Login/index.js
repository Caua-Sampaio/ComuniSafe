import style from "./Login.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleEnter(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://nongregarious-alan-wintery.ngrok-free.dev/user/login", {
                email,
                senha,
            });
            setMessage(response.data);
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

            <main className={style.main}>
                <section className={style.sobre}>
                    <div className={style.login}>
                        <h1 className={style.tittle}>Login</h1>

                        <form onSubmit={handleEnter}>
                            <input
                                type="email"
                                placeholder="E-mail:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha:"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit" class="btn">
                                Entrar
                            </button>
                        </form>

                        {message && <p className={style.message}>{message}</p>}

                        <Link to="/sing-up" className={style.linkBTN}>
                            Sing Up
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}