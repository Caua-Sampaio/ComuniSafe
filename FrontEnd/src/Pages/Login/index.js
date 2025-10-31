// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import style from "./Login.module.css";
import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { Link } from "react-router-dom";

function Login() {
// const [count, setCount] = useState(0)

    return (
        <body>

            <Header/>

            <main className={style.main}>
                <section className={style.sobre}>
                    <div className={style.login}>
                        <h1 className={style.tittle}>Login</h1>

                        <form action="" >
                            
                                <input type="text" className={style.entrada} placeholder="E-mail:" required />
                                <input type="password" className={style.entrada} placeholder="Senha:" required  />
                            
                        </form>

                        <button class="btn">Entrar</button>

                        <Link to="/sing-up" className={style.linkBTN}>Sing Up</Link>
                    </div>
                </section>
            </main>

            <Footer/>

        </body>
    )   
}

export default Login;
