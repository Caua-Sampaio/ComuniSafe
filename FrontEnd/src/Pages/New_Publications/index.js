// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import style from './New_Publications.css'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'

function NewPublications() {
// const [count, setCount] = useState(0)

return (
    <div class="body">
        
        <Header/>

        <main>
            <section class="sobre">

                <h1 class="title">Nova Publicação</h1>

                <form action="">

                    <div className={style.input_box}>

                        <input type="text" name="Assunto" id="" className={style.entrada} placeholder="Assunto:" required/>

                        <input type="text" name="Bairro" id="" className={style.entrada} placeholder="Nome do Bairro" required/>

                    </div>

                    <div className={style.input_box}>

                        <input type="date" name="Dia" id="data" className={style.entrada} required/>

                        <div className={style.input_container}>
                            <input type="file" id="arquivo" className={style.entrada}/>
                            <label for="arquivo" className={style.label_file}>Escolher arquivo</label>
                            <span id="nome-arquivo" className={style.nome_arquivo}>Nenhum arquivo selecionado</span>
                        </div>

                    </div>
                    

                    <textarea name="message" id="" cols="30" rows="10" placeholder="Sua mensagem" required></textarea>
                    <input type="submit" value="Enviar mensagem" class="btn"/>
                </form>
                

            </section>
        </main>

        <Footer/>

    </div>
)
}

export default NewPublications