import style from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // pega funções e dados do AuthContext
    const { logout, isLoggedIn } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={style.header}>
            <Link to="/">
                <span className={style.logo}><h2>ComuniSafe</h2></span>
            </Link>

            <nav className={style.navbar}>
                <ul className={style.nav_links}>
                    <li className="btn"><Link to="/emergencia">Emergência</Link></li>
                    <li><Link to="/">Sobre</Link></li>
                    <li><Link to="/publicacoes">Publicações</Link></li>
                    <li><Link to="/nova-publicacao">Nova Publicação</Link></li>

                    {isLoggedIn ? (
                        <li className={style.profile_menu} ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={style.profile_button}
                            >
                                <img src="../../../public/teste.jpg" alt="Perfil" className={style.profile_img} />
                            </button>

                            {menuOpen && (
                                <ul className={style.dropdown_menu}>
                                    <li>
                                        <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
                                    </li>
                                    <li>
                                        <Link to="/meus-posts" onClick={() => setMenuOpen(false)}>Minhas Publicações</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Sair</button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
