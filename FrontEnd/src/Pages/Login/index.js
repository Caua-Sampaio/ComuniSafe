import style from "./Login.module.css"; // estilos específicos da página de login
import Header from "../../Components/Header"; // componente de cabeçalho
import Footer from "../../Components/Footer"; // componente de rodapé
import { Link, useNavigate } from "react-router-dom"; // navegação entre páginas
import axios from "axios"; // biblioteca para requisições HTTP
import { useState } from "react"; // estado local do React
import { useAuth } from "../../Context/AuthContext"; // hook para acessar o contexto de autenticação
import { API_URL } from "../../Context/Config"; // URL base da API

export default function Login() {
    // estados para guardar o input do usuário
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [message, setMessage] = useState(""); // mensagens de erro/sucesso

    const navigate = useNavigate(); // navegação programática
    const { login } = useAuth(); // função login do contexto de autenticação

    // função executada quando o usuário envia o formulário
    async function handleEnter(e) {
        e.preventDefault(); // evita recarregar a página

        try {
            // requisição para o backend fazer login
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

            // salva usuário + token no contexto (e localStorage)
            login(response.data.user, response.data.token);

            setMessage("Login realizado com sucesso!");
            navigate("/"); // redireciona para a home
        } catch (error) {
            console.error("Erro no login:", error);

            // tratamento de erros específicos
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
        <div className={style.body}> {/* contêiner da página */}
            <Header /> {/* cabeçalho */}

            <main>
                <section className={style.sobre}>
                    <h1 className={style.title}>Login</h1>

                    <div className={style.login}>
                        {/* formulário de login */}
                        <form onSubmit={handleEnter}>
                            <div className={style.inputBox}>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // salva email digitado
                                    required
                                />
                            </div>

                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)} // salva senha digitada
                                className={style.inputSingle}
                                required
                            />

                            <button type="submit" className="btn">
                                Entrar
                            </button>
                        </form>

                        {/* exibe mensagem de erro ou sucesso */}
                        {message && <p className={style.message}>{message}</p>}

                        {/* link para fazer cadastro */}
                        <div className={style.centralizar}>
                            <Link to="/sing-up" className={style.linkBTN}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer /> {/* rodapé */}
        </div>
    );
}
