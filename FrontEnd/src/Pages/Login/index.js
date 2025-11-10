import style from "./Login.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
    // estados para armazenar o email, senha e mensagens de retorno
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // hook do react-router pra redirecionar o usuário
    const navigate = useNavigate();

    // função executada ao enviar o formulário
    async function handleEnter(e) {
    e.preventDefault();

    try {
        const response = await axios.post(
            "https://nongregarious-alan-wintery.ngrok-free.dev/api/user/login",
            { email, senha }
        );

        console.log("🟢 Resposta do backend:", response.data); // 👈 mostra o JSON no console

        // salva token
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        // salva usuário
        if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
            console.warn("⚠️ Nenhum usuário retornado pelo backend");
        }

        setMessage("Login realizado com sucesso!");
        navigate("/");
    } catch (error) {
        console.error("🔴 Erro no login:", error);

        if (error.response && error.response.status === 401) {
            setMessage("Credenciais inválidas");
        } else if (error.response && error.response.status === 404) {
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
                        {/* formulário que dispara o handleEnter */}
                        <form onSubmit={handleEnter}>
                            <div className={style.inputBox}>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // atualiza o estado do email
                                    required
                                />
                            </div>

                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)} // atualiza o estado da senha
                                className={style.inputSingle}
                                required
                            />

                            <button type="submit" className="btn">
                                Entrar
                            </button>
                        </form>

                        {/* mostra a mensagem de sucesso ou erro */}
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