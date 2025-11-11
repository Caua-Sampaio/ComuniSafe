import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import style from './Publication.module.css'

function Publication() {
  // Guarda o post clicado (pra abrir o modal completo)
  const [selectedPost, setSelectedPost] = useState(null)
  // Controla se o pop-up de login vai aparecer
  const [showPopup, setShowPopup] = useState(false)
  // Hook do react-router pra redirecionar
  const navigate = useNavigate()

  // Lista de publicações (prévia fixa)
  const posts = [
    {
      date: "01/11/2025",
      bairro: "Jardim São Paulo",
      assunto: "Alagamento",
      descricao: "Fortes chuvas causaram alagamentos na região, com ruas bloqueadas e risco para pedestres. Evite transitar pelo local. Autoridades locais estão avaliando medidas para melhorar o escoamento da água e reforçar a segurança da população.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "30/10/2025",
      bairro: "Centro",
      assunto: "Acidente",
      descricao: "Um acidente envolvendo dois veículos causou lentidão na avenida principal. O trânsito está parcialmente interditado, e equipes da CET estão no local. Não há registro de feridos graves, mas recomenda-se evitar a área.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "30/10/2025",
      bairro: "Centro",
      assunto: "Acidente",
      descricao: "Um acidente envolvendo dois veículos causou lentidão na avenida principal. O trânsito está parcialmente interditado, e equipes da CET estão no local. Não há registro de feridos graves, mas recomenda-se evitar a área.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "29/10/2025",
      bairro: "Vila Maria",
      assunto: "Falta de energia",
      descricao: "A região enfrenta interrupção no fornecimento de energia devido a manutenção emergencial na rede elétrica. A companhia informou que o serviço deve ser restabelecido até às 18h.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "28/10/2025",
      bairro: "Vila Industrial",
      assunto: "Buracos na via",
      descricao: "Diversos buracos foram identificados na via principal, causando lentidão no trânsito e aumentando o risco de acidentes com motociclistas. A prefeitura já foi notificada e deve iniciar os reparos nos próximos dias.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "01/11/2025",
      bairro: "Jardim São Paulo",
      assunto: "Alagamento",
      descricao: "Fortes chuvas causaram alagamentos na região, com ruas bloqueadas e risco para pedestres. Evite transitar pelo local. Autoridades locais estão avaliando medidas para melhorar o escoamento da água e reforçar a segurança da população.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "30/10/2025",
      bairro: "Centro",
      assunto: "Acidente",
      descricao: "Um acidente envolvendo dois veículos causou lentidão na avenida principal. O trânsito está parcialmente interditado, e equipes da CET estão no local. Não há registro de feridos graves, mas recomenda-se evitar a área.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "29/10/2025",
      bairro: "Vila Maria",
      assunto: "Falta de energia",
      descricao: "A região enfrenta interrupção no fornecimento de energia devido a manutenção emergencial na rede elétrica. A companhia informou que o serviço deve ser restabelecido até às 18h.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "28/10/2025",
      bairro: "Vila Industrial",
      assunto: "Buracos na via",
      descricao: "Diversos buracos foram identificados na via principal, causando lentidão no trânsito e aumentando o risco de acidentes com motociclistas. A prefeitura já foi notificada e deve iniciar os reparos nos próximos dias.",
      img: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
    }
  ]

  // Função chamada quando o usuário clica num post
  const handlePostClick = (post) => {
    // Verifica se tem token salvo no localStorage
    const token = localStorage.getItem("token")

    // Se NÃO tiver token, mostra pop-up pedindo login/cadastro
    if (!token) {
      setShowPopup(true)
    } else {
      // Se estiver logado, abre o modal com o post completo
      setSelectedPost(post)
    }
  }

  return (
    <div className={style.body}>
      <Header />

      <main>
        <section className={style.sobre}>
          <h1 className={style.title}>Bairros onde precisa de atenção</h1>

          {/* Container com todas as prévias */}
          <div className={style.posts_container}>
            {posts.map((post, index) => (
              <div
                className={style.publicacao}
                key={index}
                onClick={() => handlePostClick(post)} // Só checa login quando clica
              >
                <img className={style.img_post} src={post.img} alt={post.bairro} />
                <div className={style.conteudo}>
                  <span className={style.date}>{post.date}</span>
                  <h3>Bairro: <span className={style.bairro}>{post.bairro}</span></h3>
                  <h2>Assunto: <span className={style.assunto}>{post.assunto}</span></h2>
                  {/* Mostra só uma prévia da descrição */}
                  <span className={style.descricao}>
                    {post.descricao.length > 120
                      ? post.descricao.substring(0, 120) + "..."
                      : post.descricao}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal com conteúdo completo (só se estiver logado) */}
          {selectedPost && (
            <div className={style.modal_overlay} onClick={() => setSelectedPost(null)}>
              <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
                <button
                  className={style.close_button}
                  onClick={() => setSelectedPost(null)}
                >
                  ✖
                </button>
                <img
                  src={selectedPost.img}
                  alt={selectedPost.bairro}
                  className={style.modal_img}
                />
                <div className={style.modal_text}>
                  <h2>{selectedPost.assunto}</h2>
                  <p><strong>Bairro:</strong> {selectedPost.bairro}</p>
                  <p><strong>Data:</strong> {selectedPost.date}</p>
                  <p>{selectedPost.descricao}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pop-up de login atualizado */}
          {showPopup && (
            <div className={style.popup_overlay}>
              <div className={style.popup_box}>
                <p>Você precisa estar logado para ver mais detalhes da publicação.</p>
                <div className={style.popup_login}>
                  <p>Deseja se cadastrar agora? Ou já tem </p>
                  <button className={style.linkBTN} onClick={() => navigate("/login")} >Login</button>
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
  )
}

export default Publication