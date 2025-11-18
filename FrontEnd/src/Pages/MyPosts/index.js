import { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyPost.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { API_URL } from "../../Context/Config";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal de edição
  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({
    assunto: "",
    bairro: "",
    cidade: "",
    descricao: "",
    midia: null, // nova imagem
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = user?.id;

  // Busca posts do usuário
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

  // Abrir modal de edição
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditData({
      assunto: post.assunto,
      bairro: post.bairro,
      cidade: post.cidade,
      descricao: post.descricao,
      midia: null, // permite trocar a imagem
    });
  };

  // Seleciona imagem nova
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setEditData({ ...editData, midia: file });
  };

  // Atualiza o post
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("assunto", editData.assunto);
      formData.append("bairro", editData.bairro);
      formData.append("cidade", editData.cidade);
      formData.append("descricao", editData.descricao);

      if (editData.midia) {
        formData.append("midia", editData.midia);
      }

      await axios.put(`${API_URL}/post/update/${editingPost.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // atualiza localmente
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                ...editData,
                midia: editData.midia
                  ? URL.createObjectURL(editData.midia)
                  : p.midia,
              }
            : p
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
        <h1 className={style.titulo}>Minhas Publicações</h1>

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
                    src={`data:image/jpeg;base64,${post.midia}`}
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

      {/* Modal de edição */}
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

            {/* Edição de imagem com pré-visualização */}
            <label>Imagem (opcional)</label>
            <div className={style.image_edit_container}>
              {editData.midia ? (
                <img
                  src={URL.createObjectURL(editData.midia)}
                  alt="Pré-visualização"
                  className={style.preview_img}
                />
              ) : editingPost.midia ? (
                <img
                  src={`data:image/jpeg;base64,${editingPost.midia}`}
                  alt="Imagem atual"
                  className={style.preview_img}
                />
              ) : (
                <div className={style.no_image}>Sem imagem</div>
              )}

              <label htmlFor="fileInput" className={style.upload_btn}>
                Trocar Imagem
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

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
