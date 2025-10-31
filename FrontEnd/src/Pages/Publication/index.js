
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'

import './Publication.module.css'

function Publication() {

return (
    <body>
        
        <Header/>

        <main>
        <section class="sobre">

            <h1 class="title">Bairros onde precisa de atenção</h1>

            <div class="publicacao">
                <img class="img_post" src="/assets/teste.jpg" alt=""/>

                <div class="conteudo">

                    <span class="date"> xx/xx </span>
                    <h3>Bairro: <span  class="bairro"></span></h3>
                    <h2>Assunto: <span class="assunto"></span></h2>
                    <span class="descricao"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore corporis ratione necessitatibus. Qui quod maxime possimus officiis consequuntur omnis id eius fugit non atque debitis eaque, unde expedita ut.</span>
                </div>
            </div>
            
            <div class="publicacao">
                <img class="img_post" src="/assets/teste.jpg" alt=""/>

                <div class="conteudo">

                    <span class="date"> xx/xx </span>
                    <h3>Bairro: <span  class="bairro"></span></h3>
                    <h2>Assunto: <span class="assunto"></span></h2>
                    <span class="descricao"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore corporis ratione necessitatibus. Qui quod maxime possimus officiis consequuntur omnis id eius fugit non atque debitis eaque, unde expedita ut.</span>
                </div>
            </div>
            

        </section>
    </main>

        <Footer/>

    </body>
)
}

export default Publication
