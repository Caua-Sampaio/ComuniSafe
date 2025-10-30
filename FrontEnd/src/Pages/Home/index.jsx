// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import './style.css'

function Home() {
// const [count, setCount] = useState(0)

return (
    <body>
        <header>

            <div class="logo">

                    <a href="index.html"><h2>ComuniSafe</h2></a>

            </div>

            <nav class="navbar">

                <ul class="nav-links">
                    <li><a href="index.html">Sobre</a></li>
                    <li><a href="../Login">Publicações</a></li>
                    <li><a href="pages/nova_publicacao.html">Nova Publicação</a></li>
                    <li><a href="pages/login.html">Login</a></li>
                </ul>
                
            </nav>
        </header>


        <main>
            <section class="sobre">

                <h1 class="title">Bem-vindo ao ComuniSafe</h1>

                <div class="content">
                    <p>Feito para ajudar pessoas a se comunicarem em situações de emergência, o ComuniSafe é uma plataforma que oferece recursos essenciais para garantir a segurança e o bem-estar de seus usuários em sua comunidade.</p>
                </div>
                
                <div class="botao">
                    
                    <a href="/pages/publicacao.html" class="btn">Ver Publicações</a>

                </div>
                

                

            </section>
        </main>


        <footer>

            <div class="links">
                <a href="index.html">Home</a>
                <a href="pages/publicacao.html">Publicações</a>
            </div>
                
            
            <div class="copyright">
                <p>&copy; 2025 ComuniSafe.</p>
                <p>Todos os direitos reservados.</p>
            </div>
            
        </footer>

    </body>
)
}

export default Home
