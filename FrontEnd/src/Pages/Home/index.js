// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import style from './Home.module.css';

function Home() {
// const [count, setCount] = useState(0)

return (
    <div class="body">
        
        <Header/>

        <main>
            <section class="sobre">

                <h1 class="title">Bem-vindo ao ComuniSafe</h1>

                <div className={style.content}>
                    <p>Feito para ajudar pessoas a se comunicarem em situações de emergência, o ComuniSafe é uma plataforma que oferece recursos essenciais para garantir a segurança e o bem-estar de seus usuários em sua comunidade.</p>
                </div>
                
                <div className={style.botao}>
                    
                    <Link to="/publicacoes" class="btn">Ver Publicações</Link>

                </div>
                

                    

            </section>
        </main>

        <Footer/>

    </div>
)
}

export default Home
