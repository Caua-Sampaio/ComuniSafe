import { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyPost.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { API_URL } from "../../Context/Config";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal de edição
  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({
    assunto: "",
    bairro: "",
    cidade: "",
    descricao: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = user?.id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!usuarioId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put(`${API_URL}/post/myPosts/${usuarioId}`);
        setPosts(response.data.content || []);
      } catch (error) {
        console.error("Erro ao buscar publicações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [usuarioId]);

  // abrir modal
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditData({
      assunto: post.assunto,
      bairro: post.bairro,
      cidade: post.cidade,
      descricao: post.descricao
    });
  };

  // atualizar no backend
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/post/update/${editingPost.id}`,
        editData
      );

      // atualiza na tela sem recarregar
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, ...editData } : p
        )
      );

      setEditingPost(null);
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
      alert("Erro ao atualizar a publicação.");
    }
  };

  if (!user) {
    return (
      <div className={style.body}>
        <Header />
        <main className={style.container}>
          <h2>Você precisa estar logado para ver suas publicações.</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={style.body}>
      <Header />
      <main className={style.container}>
        <h1>Minhas Publicações</h1>

        {loading ? (
          <p>Carregando suas publicações...</p>
        ) : posts.length === 0 ? (
          <p>Você ainda não criou nenhuma publicação.</p>
        ) : (
          <div className={style.posts_container}>
            {posts.map((post, index) => (
              <div key={post.id ?? index} className={style.post_card}>
                {post.midia && (
                  <img
                    src={`${API_URL}/uploads/${post.midia}`}
                    alt={post.assunto}
                    className={style.post_img}
                  />
                )}

                <div className={style.post_info}>
                  <h2>{post.assunto}</h2>
                  <p><strong>Bairro:</strong> {post.bairro}</p>
                  <p><strong>Cidade:</strong> {post.cidade}</p>
                  <p><strong>Data:</strong> {new Date(post.moment).toLocaleDateString()}</p>

                  <p className={style.descricao}>
                    {post.descricao?.length > 120
                      ? post.descricao.substring(0, 120) + "..."
                      : post.descricao}
                  </p>

                  {/* BOTÃO DE EDITAR – só o dono vê */}
                  <button
                    className={style.edit_btn}
                    onClick={() => openEditModal(post)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* MODAL DE EDIÇÃO */}
      {editingPost && (
        <div className={style.modal_overlay}>
          <div className={style.modal_box}>
            <h2>Editar Publicação</h2>

            <label>Assunto</label>
            <input
              type="text"
              value={editData.assunto}
              onChange={(e) =>
                setEditData({ ...editData, assunto: e.target.value })
              }
            />

            <label>Bairro</label>
            <input
              type="text"
              value={editData.bairro}
              onChange={(e) =>
                setEditData({ ...editData, bairro: e.target.value })
              }
            />

            <label>Cidade</label>
            <input
              type="text"
              value={editData.cidade}
              onChange={(e) =>
                setEditData({ ...editData, cidade: e.target.value })
              }
            />

            <label>Descrição</label>
            <textarea
              rows="4"
              value={editData.descricao}
              onChange={(e) =>
                setEditData({ ...editData, descricao: e.target.value })
              }
            />

            <div className={style.modal_actions}>
              <button onClick={() => setEditingPost(null)}>Cancelar</button>
              <button onClick={handleUpdate} className={style.salvar_btn}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
