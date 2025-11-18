import style from "./Header.module.css"; // Importa o CSS do header
import { Link, useNavigate } from "react-router-dom"; // Navegação e links
import { useState, useEffect, useRef } from "react"; // Hooks do React
import { useAuth } from "../../Context/AuthContext"; // Contexto de autenticação

function Header() {
  const navigate = useNavigate(); // Hook pra navegar programaticamente
  const [menuOpen, setMenuOpen] = useState(false); // Estado do dropdown do perfil
  const [hamburgerOpen, setHamburgerOpen] = useState(false); // Estado do menu hamburger mobile
  const menuRef = useRef(null); // Referência do dropdown do perfil
  const { logout, isLoggedIn } = useAuth(); // Funções e estado do AuthContext

  // Função de logout → limpa o contexto e redireciona para login
  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Fecha o dropdown se clicar fora dele
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
      {/* Logo que leva para a home */}
      <Link to="/">
        <span className={style.logo}><h2>ComuniSafe</h2></span>
      </Link>

      {/* Hamburger mobile - só aparece em telas pequenas */}
      <div
        className={`${style.hamburger} ${hamburgerOpen ? style.active : ""}`}
        onClick={() => setHamburgerOpen(!hamburgerOpen)} // Abre/fecha o menu
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar */}
      <nav className={`${style.navbar} ${hamburgerOpen ? style.active : ""}`}>
        <ul className={style.nav_links}>
          {/* Links fixos */}
          <li className="btn">
            <Link to="/emergencia" onClick={() => setHamburgerOpen(false)}>Emergência</Link>
          </li>
          <li>
            <Link to="/" onClick={() => setHamburgerOpen(false)}>Sobre</Link>
          </li>
          <li>
            <Link to="/publicacoes" onClick={() => setHamburgerOpen(false)}>Publicações</Link>
          </li>
          <li>
            <Link to="/nova-publicacao" onClick={() => setHamburgerOpen(false)}>Nova Publicação</Link>
          </li>

          {/* Menu de perfil ou login */}
          {isLoggedIn ? (
            <li className={style.profile_menu} ref={menuRef}>
              {/* Botão do perfil */}
              <button
                className={style.profile_button}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img src="../../../public/teste.jpg" alt="Perfil" className={style.profile_img} />
              </button>

              {/* Dropdown do perfil */}
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
            <li>
              <Link to="/login" onClick={() => setHamburgerOpen(false)}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
