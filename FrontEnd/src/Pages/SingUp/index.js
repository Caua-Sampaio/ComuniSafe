import style from "./SingUp.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [nome, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://nongregarious-alan-wintery.ngrok-free.dev/user/cadastrar", {
                nome,
                senha,
                bairro,
                cidade,
                email,
            });
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage("Erro no servidor");
            }
        }
    }

    return (
        <div className={style.body}>
            <Header />

            <main>
                <section class="sobre">
                    <h1 class="title">Sign Up</h1>

                    <div className={style.singUp}>
                        <form onSubmit={handleSubmit} className="flex-row">
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    required
                                />
                            </div>

                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit" className="btn">
                                Cadastrar
                            </button>
                        </form>

                        {message && <p className={style.message}>{message}</p>}

                        <div className="centralizar">
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default SignUp;