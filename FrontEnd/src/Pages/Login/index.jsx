// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import './style.css'

function Home() {
// const [count, setCount] = useState(0)

return (
    <body>
        <main>
            <section class="sobre">

                <div class="login">

                    <h1 class="title">Login<h1>
                
                    <form action="">
                        <div class="input-box">

                            <input type="email" class="entrada" placeholder="E-mail:" required>
                            <input type="password" class="entrada" placeholder="Senha" required>


                        </div>
                        
                    </form>

                    
                <div class="centralizar">

                    <input type="submit" value="Entrar" class="btn">

                </div>

                <div class="centralizar">
                    <a href="singup.html" class="login_btn">Cadastrar</a>
                </div>

                </div>
                
            </section>
        </main>
    </body>
)
}

export default Home
