import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

import style from "./Publication.module.css";
import { API_URL } from "../../Context/Config";

function Publication() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Scroll infinito
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const loaderRef = useRef(null);
  const navigate = useNavigate();

  // Formata a data para dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const loadPosts = async (pageNumber) => {
    if (loading || isLast) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.put(`${API_URL}/post/allPosts`, {
        params: { page: pageNumber, size: 2 },
        headers: { Accept: "application/json" },
      });

      const data = response.data;

      if (!data || !Array.isArray(data.content)) {
        setErrorMsg("Backend retornou dados inválidos ou HTML.");
        setLoading(false);
        return;
      }

      setPosts((prev) => [...prev, ...data.content]);
      setIsLast(data.last ?? false);
    } catch (err) {
      console.error("❌ ERRO AO BUSCAR POSTS:", err);
      if (err.message === "Network Error") {
        setErrorMsg("Não foi possível conectar ao backend. Verifique a URL e se o servidor está ativo.");
      } else {
        setErrorMsg("Erro ao buscar posts.");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && !isLast) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, isLast]);

  const handlePostClick = (post) => {
    const token = localStorage.getItem("user");
    if (!token) {
      setShowPopup(true);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <div className={style.body}>
      <Header />

      <main>
        <section className={style.sobre}>
          <h1 className={style.title}>Bairros onde precisa de atenção</h1>

          {errorMsg && (
            <p style={{ textAlign: "center", marginTop: "1rem", color: "red" }}>
              {errorMsg}
            </p>
          )}

          <div className={style.posts_container}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  className={style.publicacao}
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                >
                  <div className={style.conteudo}>
                    <span className={style.date}>{formatDate(post.moment)}</span>
                    <h3>
                      Bairro: <span className={style.bairro}>{post.bairro}</span>
                    </h3>
                    <h2>
                      Assunto: <span className={style.assunto}>{post.assunto}</span>
                    </h2>
                    <span className={style.descricao}>
                      {post.descricao?.length > 120
                        ? post.descricao.substring(0, 120) + "..."
                        : post.descricao}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>
                Nenhuma publicação encontrada.
              </p>
            )}
          </div>

          {loading && (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>Carregando...</p>
          )}

          {isLast && (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Você chegou ao final! 🎉
            </p>
          )}

          <div ref={loaderRef} style={{ height: "20px" }} />

          {selectedPost && (
            <div className={style.modal_overlay} onClick={() => setSelectedPost(null)}>
              <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
                <button
                  className={style.close_button}
                  onClick={() => setSelectedPost(null)}
                >
                  ✖
                </button>
                <div className={style.modal_text}>
                  <h2>{selectedPost.assunto}</h2>
                  <p><strong>Bairro:</strong> {selectedPost.bairro}</p>
                  <p><strong>Data:</strong> {formatDate(selectedPost.moment)}</p>
                  <p>{selectedPost.descricao}</p>
                </div>
              </div>
            </div>
          )}

          {showPopup && (
            <div className={style.popup_overlay}>
              <div className={style.popup_box}>
                <p>Você precisa estar logado para ver mais detalhes.</p>
                <div className={style.popup_login}>
                  <button className={style.linkBTN} onClick={() => navigate("/login")}>
                    Login
                  </button>
                </div>
                <div className={style.popup_buttons}>
                  <button onClick={() => navigate("/sing-up")}>Sim</button>
                  <button onClick={() => setShowPopup(false)}>Não</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Publication;
