// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
import style from "./SingUp.module.css";
import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { Link } from "react-router-dom";

function SingUp() {
// const [count, setCount] = useState(0)

    return (
        <div class="body">

            <Header/>

                <main className={style.main}>
                    <section class="sobre">

                        <h1 class="title">Sing Up</h1>
                        
                        <div class="sing-up">


                            <form action="" id="forms"  class="flex-row">
                                
                                <div class="input-box">

                                    <input type="name" id="newName" class="entrada" placeholder="Nome:" required/>
                                    <input type="email" class="entrada" placeholder="E-mail:" />

                                    
                                    
                                </div>

                                <div class="input-box">
                                    <input type="text" id="newBairro" class="entrada" placeholder="Barro:" required/>
                                    <input type="text" id="newCidade" class="entrada" placeholder="Cidade" required/>
                                    

                                </div>
                                
                                <input type="password" id="newPassword" class="entrada" placeholder="Senha" required/>
                                
                            </form>

                        </div>

                        <div class="centralizar">

                            <input type="submit" value="Cadastrar" class="btn"/>

                        </div>

                        <div class="centralizar">
                            <Link to="/login">Login</Link>
                        </div>

                    </section>
                </main>


            <Footer/>

        </div>
    )   
}

export default SingUp;
