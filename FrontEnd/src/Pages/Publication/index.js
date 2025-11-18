import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

import style from "./Publication.module.css";
import { API_URL } from "../../Context/Config";

function Publication() {
  // Armazena lista de posts que chegam do backend
  const [posts, setPosts] = useState([]);

  // Guarda qual post foi clicado para abrir o modal
  const [selectedPost, setSelectedPost] = useState(null);

  // Controla popup de login obrigatório
  const [showPopup, setShowPopup] = useState(false);

  // Mensagem de erro caso a requisição falhe
  const [errorMsg, setErrorMsg] = useState("");

  // Controle do scroll infinito
  const [page, setPage] = useState(0); // Página atual
  const [loading, setLoading] = useState(false); // Evita requisições duplicadas
  const [isLast, setIsLast] = useState(false); // Se chegou no final da lista

  // Referência usada pelo IntersectionObserver no scroll infinito
  const loaderRef = useRef(null);

  // Usado para redirecionar o usuário
  const navigate = useNavigate();

  // Função que formata a data para o padrão brasileiro
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Busca posts no backend com base na página atual
  const loadPosts = async (pageNumber) => {
    if (loading || isLast) return; // Evita re-fetch desnecessário
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.put(`${API_URL}/post/allPosts`, {
        // Envia paginação para o backend
        params: { page: pageNumber, size: 2 },
        headers: { Accept: "application/json" },
      });

      const data = response.data;

      // Se o backend mandar HTML ou algo inesperado
      if (!data || !Array.isArray(data.content)) {
        setErrorMsg("Backend retornou dados inválidos ou HTML.");
        setLoading(false);
        return;
      }

      // Adiciona os novos posts na lista atual
      setPosts((prev) => [...prev, ...data.content]);

      // Marca se é a última página
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

  // Chama a função toda vez que a página mudar
  useEffect(() => {
    loadPosts(page);
  }, [page]);

  // Configura o IntersectionObserver para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        // Quando o loader aparece na tela, carrega próxima página
        if (target.isIntersecting && !loading && !isLast) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    // Ativa o observer
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Limpa ao desmontar
    return () => observer.disconnect();
  }, [loading, isLast]);

  // Quando clica em um post
  const handlePostClick = (post) => {
    const token = localStorage.getItem("user");

    // Se não estiver logado, exibe popup
    if (!token) {
      setShowPopup(true);
    } else {
      // Senão, abre modal com os detalhes
      setSelectedPost(post);
    }
  };

  return (
    <div className={style.body}>
      <Header />

      <main>
        <section className={style.sobre}>
          <h1 className={style.title}>Bairros onde precisa de atenção</h1>

          {/* Exibe mensagem de erro, se existir */}
          {errorMsg && (
            <p style={{ textAlign: "center", marginTop: "1rem", color: "red" }}>
              {errorMsg}
            </p>
          )}

          {/* Lista de posts */}
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

                    {/* Limita a descrição a 120 caracteres */}
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

          {/* Loading do scroll infinito */}
          {loading && (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>Carregando...</p>
          )}

          {/* Aviso quando não tem mais conteúdo */}
          {isLast && (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Você chegou ao final! 🎉
            </p>
          )}

          {/* Div usada apenas como âncora do scroll infinito */}
          <div ref={loaderRef} style={{ height: "20px" }} />

          {/* Modal com detalhes do post */}
          {selectedPost && (
            <div
              className={style.modal_overlay}
              onClick={() => setSelectedPost(null)}
            >
              <div
                className={style.modal_content}
                onClick={(e) => e.stopPropagation()}
              >
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

          {/* Popup pedindo login */}
          {showPopup && (
            <div className={style.popup_overlay}>
              <div className={style.popup_box}>
                <p>Você precisa estar logado para ver mais detalhes.</p>

                <div className={style.popup_login}>
                  <button
                    className={style.linkBTN}
                    onClick={() => navigate("/login")}
                  >
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
