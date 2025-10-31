import style from "./Header.module.css";
import { Link } from "react-router-dom";


function Header (){

    return(
        <header className={style.header}>

            <Link to="/">
            
                <span className={style.logo}><h2>ComuniSafe</h2></span>
            
            </Link>

            <nav className={style.navbar}>

                <ul className={style.nav_links}>
                    <li><Link to="/">Sobre</Link></li>
                    <li><Link to="/publicacoes">Publicações</Link></li>
                    <li><Link to="/nova-publicacao">Nova Publicação</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                
            </nav>
        </header>
    );

}

export default Header;