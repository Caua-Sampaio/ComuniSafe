import { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyPost.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { API_URL } from "../../Context/Config";

function MyPosts() {
  // guarda as publicações do usuário
  const [posts, setPosts] = useState([]);
  // controle de carregamento da página
  const [loading, setLoading] = useState(true);

  // estados do modal de edição
  const [editingPost, setEditingPost] = useState(null); // qual post está sendo editado
  const [editData, setEditData] = useState({
    assunto: "",
    bairro: "",
    cidade: "",
    descricao: ""
  });

  // pega o usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = user?.id;

  // busca as publicações do usuário ao abrir a página
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!usuarioId) {
        setLoading(false);
        return;
      }

      try {
        // requisição para buscar posts do usuário
        const response = await axios.put(`${API_URL}/post/myPosts/${usuarioId}`);
        // salva os posts retornados
        setPosts(response.data.content || []);
      } catch (error) {
        console.error("Erro ao buscar publicações do usuário:", error);
      } finally {
        // encerra estado de carregamento
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [usuarioId]);

  // abre o modal preenchendo com os dados do post
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditData({
      assunto: post.assunto,
      bairro: post.bairro,
      cidade: post.cidade,
      descricao: post.descricao
    });
  };

  // enviar atualização ao backend
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/post/update/${editingPost.id}`,
        editData
      );

      // atualiza o estado local para refletir a edição sem recarregar a página
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, ...editData } : p
        )
      );

      // fecha o modal
      setEditingPost(null);
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
      alert("Erro ao atualizar a publicação.");
    }
  };

  // se o usuário não estiver logado
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
        <h1 className={style.titulo}>Minhas Publicações</h1>

        {/* mensagens de carregamento ou lista de posts */}
        {loading ? (
          <p>Carregando suas publicações...</p>
        ) : posts.length === 0 ? (
          <p>Você ainda não criou nenhuma publicação.</p>
        ) : (
          <div className={style.posts_container}>
            {/* percorre todos os posts do usuário */}
            {posts.map((post, index) => (
              <div key={post.id ?? index} className={style.post_card}>
                {/* exibe a imagem se existir */}
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

                  {/* descrição cortada se for muito grande */}
                  <p className={style.descricao}>
                    {post.descricao?.length > 120
                      ? post.descricao.substring(0, 120) + "..."
                      : post.descricao}
                  </p>

                  {/* botão que abre o modal */}
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

      {/* modal de edição — aparece só quando editingPost tem algum valor */}
      {editingPost && (
        <div className={style.modal_overlay}>
          <div className={style.modal_box}>
            <h2>Editar Publicação</h2>

            {/* campos com os valores do post */}
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

            {/* botões do modal */}
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
