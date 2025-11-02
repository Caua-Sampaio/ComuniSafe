import style from "./Success.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useLocation, Link } from "react-router-dom";

export default function Success() {
    const location = useLocation();
    const message = location.state?.message || "Operação concluída com sucesso!";

    return (
        <div className={style.body}>
            <Header />

            <main className={style.main}>
                <section className={style.sobre}>
                    <h1 className={style.title}>{message}</h1>
                    <p>Você pode continuar navegando no sistema.</p>
                    <Link to="/" className="btn">Voltar para Home</Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}