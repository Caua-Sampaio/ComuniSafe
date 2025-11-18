
import { Link } from 'react-router-dom'; // usado para navegar entre rotas sem recarregar a página
import Footer from '../../Components/Footer' // componente de rodapé
import Header from '../../Components/Header' // componente de cabeçalho
import style from './Home.module.css'; // arquivo de estilos específicos da página Home

function Home() {


return (
    <div class="body"> {/* contêiner principal da página */}
        
        <Header/> {/* exibe o cabeçalho fixo do site */}

        <main>
            <section class="sobre"> {/* seção de conteúdo principal da Home */}

                <h1 class="title">Bem-vindo ao ComuniSafe</h1> {/* título de apresentação */}

                {/* bloco com texto explicando a proposta da plataforma */}
                <div className={style.content}>
                    <p>
                        Feito para ajudar pessoas a se comunicarem em situações de emergência,
                        o ComuniSafe é uma plataforma que oferece recursos essenciais para garantir
                        a segurança e o bem-estar de seus usuários em sua comunidade.
                    </p>
                </div>
                
                {/* área que contém o botão para acessar as publicações */}
                <div className={style.botao}>
                    <Link to="/publicacoes" class="btn">Ver Publicações</Link>
                    {/* Link do React Router que leva o usuário para a página de publicações */}
                </div>

            </section>
        </main>

        <Footer/> {/* exibe o rodapé */}
    </div>
)
}

export default Home
