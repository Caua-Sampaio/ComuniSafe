import { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyPost.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        // 🔹 Substitui pela URL da tua API
        const response = await axios.get(
          `https://nongregarious-alan-wintery.ngrok-free.dev/api/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar publicações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, token]);

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
            {posts.map((post) => (
              <div key={post.id} className={style.post_card}>
                <img
                  src={post.imagem || "https://via.placeholder.com/300x200"}
                  alt={post.assunto}
                  className={style.post_img}
                />

                <div className={style.post_info}>
                  <h2>{post.assunto}</h2>
                  <p><strong>Bairro:</strong> {post.bairro}</p>
                  <p><strong>Data:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className={style.descricao}>
                    {post.descricao.length > 120
                      ? post.descricao.substring(0, 120) + "..."
                      : post.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyPosts;
