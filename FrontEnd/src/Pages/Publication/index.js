import { useState } from 'react'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import style from './Publication.module.css'

function Publication() {
  const [selectedPost, setSelectedPost] = useState(null)

  const posts = [
    {
      date: "01/11/2025",
      bairro: "Jardim São Paulo",
      assunto: "Alagamento",
      descricao: "Fortes chuvas causaram alagamentos na região, com ruas bloqueadas e risco para pedestres. Evite transitar pelo local. Autoridades locais estão avaliando medidas para melhorar o escoamento da água e reforçar a segurança da população.",
      img: "https://images.unsplash.com/photo-1561484930-998b6a7b7f09?auto=format&fit=crop&w=800&q=80"
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
      img: "https://images.unsplash.com/photo-1590602847861-432e1f4d2846?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "28/10/2025",
      bairro: "Vila Industrial",
      assunto: "Buracos na via",
      descricao: "Diversos buracos foram identificados na via principal, causando lentidão no trânsito e aumentando o risco de acidentes com motociclistas. A prefeitura já foi notificada e deve iniciar os reparos nos próximos dias.",
      img: "https://images.unsplash.com/photo-1565634304605-2b71b98c1e0b?auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <div className={style.body}>
      <Header />

      <main>
        <section className={style.sobre}>
          <h1 className={style.title}>Bairros onde precisa de atenção</h1>

          <div className={style.posts_container}>
            {posts.map((post, index) => (
              <div
                className={style.publicacao}
                key={index}
                onClick={() => setSelectedPost(post)}
              >
                <img className={style.img_post} src={post.img} alt={post.bairro} />
                <div className={style.conteudo}>
                  <span className={style.date}>{post.date}</span>
                  <h3>Bairro: <span className={style.bairro}>{post.bairro}</span></h3>
                  <h2>Assunto: <span className={style.assunto}>{post.assunto}</span></h2>
                  <span className={style.descricao}>
                    {post.descricao.length > 120 ? post.descricao.substring(0, 120) + "..." : post.descricao}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedPost && (
            <div className={style.modal_overlay} onClick={() => setSelectedPost(null)}>
              <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
                <button className={style.close_button} onClick={() => setSelectedPost(null)}>✖</button>
                <img src={selectedPost.img} alt={selectedPost.bairro} className={style.modal_img}/>
                <div className={style.modal_text}>
                  <h2>{selectedPost.assunto}</h2>
                  <p><strong>Bairro:</strong> {selectedPost.bairro}</p>
                  <p><strong>Data:</strong> {selectedPost.date}</p>
                  <p>{selectedPost.descricao}</p>
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
