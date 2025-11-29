// Código completo atualizado conforme solicitado.

import { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyPost.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { API_URL } from "../../Context/Config";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({
    assunto: "",
    bairro: "",
    cidade: "",
    descricao: "",
    midia: null,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = user?.id;

  // ===========================
  // MÉTODO: buscar posts do usuário + FILTRO DE DELETADOS
  // ===========================
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!usuarioId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put(`${API_URL}/post/myPosts/${usuarioId}`);

        const postsFiltrados = (response.data.content || []).filter(
          (p) => p.deletado === false
        );

        setPosts(postsFiltrados);
      } catch (error) {
        console.error("Erro ao buscar publicações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [usuarioId]);

  // ===========================
  // MÉTODO: abrir modal de edição
  // ===========================
  const openEditModal = (post) => {
    const postData = {
      id: post.id,
      usuarioId: usuarioId,
      bairro: post.bairro,
      cidade: post.cidade,
      moment: post.moment,
      descricao: post.descricao,
      assunto: post.assunto,
      midia: post.midia,
      deletado: post.deletado,
    };

    console.log("Post selecionado para edição:", postData);

    setEditingPost(postData);

    setEditData({
      assunto: post.assunto,
      bairro: post.bairro,
      cidade: post.cidade,
      descricao: post.descricao,
      midia: null,
    });
  };

  // ===========================
  // MÉTODO: alterar arquivo
  // ===========================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setEditData({ ...editData, midia: file });
  };

  // ===========================
  // MÉTODO: atualizar publicação (FORM-DATA)
  // ===========================
  const handleUpdate = async () => {
    console.log("Iniciando edição do post:", editingPost.id);

    try {
      const formData = new FormData();

      const fullPostObject = {
        id: editingPost.id,
        usuarioId: editingPost.usuarioId,
        bairro: editData.bairro,
        cidade: editData.cidade,
        moment: editingPost.moment,
        descricao: editData.descricao,
        assunto: editData.assunto,
        deletado: false, 
      };

      formData.append("post", JSON.stringify(fullPostObject));

      if (editData.midia) {
        console.log("Nova imagem adicionada");
        formData.append("midia", editData.midia);
      }

      const response = await axios.put(
        `${API_URL}/post/update/${editingPost.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Resposta da atualização:", response.data);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                assunto: editData.assunto,
                bairro: editData.bairro,
                cidade: editData.cidade,
                descricao: editData.descricao,
                midia: editData.midia
                  ? URL.createObjectURL(editData.midia)
                  : p.midia,
              }
            : p
        )
      );

      alert("Publicação atualizada com sucesso!");
      setEditingPost(null);
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
      alert("Erro ao atualizar a publicação.");
    }
  };

  // ===========================
  // MÉTODO: deletar publicação
  // ===========================
  const handleDelete = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir essa publicação?")) return;

    try {
      await axios.delete(`${API_URL}/post/${postId}/usuario/${usuarioId}`);

      // Remove da lista local e reforça o filtro
      setPosts((prev) =>
        prev.filter((p) => p.id !== postId && p.deletado === false)
      );

      console.log("Post deletado com ID:", postId);
      alert("Publicação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar publicação:", error);
      alert("Erro ao excluir a publicação.");
    }
  };

  // ===========================
  // RENDERIZAÇÃO PRINCIPAL
  // ===========================
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
            {posts
              .filter((p) => p.deletado === false)
              .map((post, index) => (
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

                    <div className={style.buttons_row}>
                      <button
                        className={style.edit_btn}
                        onClick={() => openEditModal(post)}
                      >
                        Editar
                      </button>

                      <button
                        className={style.delete_btn}
                        onClick={() => handleDelete(post.id)}
                      >
                        Excluir
                      </button>
                    </div>
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
              ) : null}
            </div>

            <input type="file" onChange={handleFileChange} />

            <div className={style.modal_buttons}>
              <button className={style.save_btn} onClick={handleUpdate}>
                Salvar Alterações
              </button>

              <button
                className={style.cancel_btn}
                onClick={() => setEditingPost(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
