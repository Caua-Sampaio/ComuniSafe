import style from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer (){
    return(
        
        <footer className={style.footer}>

            <div className={style.links}>
                <Link to="/">Home</Link>
                <Link to="/publicacoes">Publicações</Link>
            </div>
                
            
            <div className={style.copyright}>
                <p>&copy; 2025 ComuniSafe.</p>
                <p>Todos os direitos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer;