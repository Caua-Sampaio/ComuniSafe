import style from "./SingUp.module.css"; // Importa o CSS module para estilização
import Header from "../../Components/Header"; // Componente de cabeçalho
import Footer from "../../Components/Footer"; // Componente de rodapé
import { Link, useNavigate } from "react-router-dom"; // Link para navegação e hook para redirecionamento
import { useState } from "react"; // Hook para manipular estados
import axios from "axios"; // Cliente HTTP para requisições

function SignUp() {
    // Estados controlados responsáveis pelos inputs do formulário
    const [nome, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [senha, setPassword] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false); // Controla exibição da senha
    const [showConfirmSenha, setShowConfirmSenha] = useState(false); // Exibe confirmação da senha
    const [message, setMessage] = useState(""); // Guarda mensagens de erro ou sucesso

    const navigate = useNavigate(); // Permite navegação programática

    // Função que verifica se a senha atende aos requisitos
    function validarSenha() {
        if (senha !== confirmSenha) {
            setMessage("As senhas não coincidem.");
            return false;
        }

        if (senha.length < 6) {
            setMessage("A senha precisa ter pelo menos 6 caracteres.");
            return false;
        }

        // Verifica se tem letras e números
        const regexForca = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!regexForca.test(senha)) {
            setMessage("A senha deve conter letras e números.");
            return false;
        }

        return true;
    }

    // Função executada ao enviar o formulário
    async function handleSubmit(e) {
        e.preventDefault(); // Impede refresh da página
        setMessage(""); // Limpa mensagens anteriores

        // Se a senha for inválida, encerra aqui
        if (!validarSenha()) return;

        try {
            // Faz requisição para cadastrar o usuário no backend
            await axios.post(
                "https://nongregarious-alan-wintery.ngrok-free.dev/user/cadastrar",
                { nome, senha, bairro, cidade, email }
            );

            // Se deu certo, mostra mensagem e redireciona para página de sucesso
            setMessage("Usuário cadastrado com sucesso!");
            navigate("/success", { state: { message: "Cadastro concluído com sucesso!" } });

        } catch (error) {
            // Caso o servidor retorne erro tratado
            if (error.response) {
                if (error.response.status === 400 && error.response.data?.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Erro ao cadastrar usuário.");
                }
            } else {
                // Caso o servidor nem responda
                setMessage("Erro de conexão com o servidor.");
            }
        }
    }

    return (
        <div className={style.body}> {/* Container principal com estilização */}
            <Header /> {/* Cabeçalho */}

            <main>
                <section className="sobre">
                    <h1 className="title">Sign Up</h1>

                    <div className={style.singUp}>
                        {/* Formulário de cadastro */}
                        <form onSubmit={handleSubmit} className="flex-row">
                            {/* Inputs de nome e email */}
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

                            {/* Inputs de bairro e cidade */}
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

                            {/* Inputs de senha e confirmação */}
                            <div className={style.inputBox}>
                                {/* Campo de senha com botão para mostrar/esconder */}
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

                                {/* Campo de confirmação de senha */}
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

                            {/* Botão de enviar */}
                            <button type="submit" className="btn">Cadastrar</button>
                        </form>

                        {/* Mensagem de erro ou sucesso */}
                        {message && <p className={style.message}>{message}</p>}

                        {/* Link para login */}
                        <div style={{ textAlign: "center" }}>
                            <Link to="/login" className={style.linkBTN}>Login</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer /> {/* Rodapé */}
        </div>
    );
}

export default SignUp;
