import style from "./Success.module.css"; // Importa o CSS module com os estilos da página de sucesso
import Header from "../../Components/Header"; // Componente de cabeçalho
import Footer from "../../Components/Footer"; // Componente de rodapé
import { useLocation, Link } from "react-router-dom"; // Hook para acessar dados da navegação e componente de link

export default function Success() {
    const location = useLocation(); // Pega informações enviadas pela navegação anterior
    const message = location.state?.message || "Operação concluída com sucesso!"; 
    // Usa a mensagem recebida pelo navigate ou uma padrão caso nada tenha sido enviado

    return (
        <div className={style.body}> {/* Estrutura geral da página com estilização */}
            <Header /> {/* Cabeçalho fixo em todas as páginas */}

            <main className={style.main}>
                <section className={style.sobre}>
                    {/* Exibe a mensagem recebida (ex: sucesso no cadastro) */}
                    <h1 className={style.title}>{message}</h1>
                    <p>Você pode continuar navegando no sistema.</p>

                    {/* Botão que volta o usuário para a home */}
                    <Link to="/" className={style.btn}>Voltar para Home</Link>
                </section>
            </main>

            <Footer /> {/* Rodapé */}
        </div>
    );
}
