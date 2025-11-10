import style from "./SingUp.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [nome, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [senha, setPassword] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    function validarSenha() {
        if (senha !== confirmSenha) {
            setMessage("As senhas não coincidem.");
            return false;
        }

        if (senha.length < 6) {
            setMessage("A senha precisa ter pelo menos 6 caracteres.");
            return false;
        }

        const regexForca = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!regexForca.test(senha)) {
            setMessage("A senha deve conter letras e números.");
            return false;
        }

        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");

        if (!validarSenha()) return;

        try {
            await axios.post(
                "https://nongregarious-alan-wintery.ngrok-free.dev/user/cadastrar",
                { nome, senha, bairro, cidade, email }
            );

            setMessage("Usuário cadastrado com sucesso!");
            navigate("/success", { state: { message: "Cadastro concluído com sucesso!" } });
        } catch (error) {
            setMessage("Erro ao cadastrar usuário.");
        }
    }

    return (
        <div className={style.body}>
            <Header />

            <main>
                <section className="sobre">
                    <h1 className="title">Sign Up</h1>

                    <div className={style.singUp}>
                        <form onSubmit={handleSubmit} className="flex-row">
                            <div className={style.inputBox}>
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

                            <div className={style.inputBox}>
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

                            <div className={style.inputBox}>
                                <div className={style.passwordField}>
                                    <input
                                        type={showSenha ? "text" : "password"}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={style.showBtn}
                                        onClick={() => setShowSenha(!showSenha)}
                                    >
                                        {showSenha ? "🫣" : "👁"}
                                    </button>
                                </div>

                                <div className={style.passwordField}>
                                    <input
                                        type={showConfirmSenha ? "text" : "password"}
                                        placeholder="Confirme a Senha"
                                        value={confirmSenha}
                                        onChange={(e) => setConfirmSenha(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={style.showBtn}
                                        onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                                    >
                                        {showConfirmSenha ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn">Cadastrar</button>
                        </form>

                        {message && <p className={style.message}>{message}</p>}

                        <div style={{ textAlign: "center" }}>
                            <Link to="/login" className={style.linkBTN}>Login</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default SignUp;
