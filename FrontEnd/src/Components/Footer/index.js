import style from "./Footer.module.css"; // Importa o CSS do footer
import { Link } from "react-router-dom"; // Permite usar links internos da aplicação

function Footer (){
    return(
        <footer className={style.footer}>
            
            {/* Links rápidos do site */}
            <div className={style.links}>
                <Link to="/">Home</Link>
                <Link to="/publicacoes">Publicações</Link>
            </div>
                
            {/* Informações de copyright */}
            <div className={style.copyright}>
                <p>&copy; 2025 ComuniSafe.</p>
                <p>Todos os direitos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer;
