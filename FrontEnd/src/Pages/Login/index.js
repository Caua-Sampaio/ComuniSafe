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
        <div class="body">

            <Header/>

            <main className={style.main}>
                <section className={style.sobre}>
                    <div className={style.login}>
                        <h1 className={style.tittle}>Login</h1>

                        <form action="" >
                            
                            <input type="text" placeholder="E-mail:" id="" required />
                            <input type="password" placeholder="Senha:" required  />
                            
                        </form>

                        <button class="btn">Entrar</button>

                        <Link to="/sing-up" className={style.linkBTN}>Sing Up</Link>
                    </div>
                </section>
            </main>

            <Footer/>

        </div>
    )   
}

export default Login;
