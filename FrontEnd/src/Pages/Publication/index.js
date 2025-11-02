import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import style from './Publication.module.css'

function Publication() {
  const posts = [
    {
      date: "01/11/2025",
      bairro: "Jardim São Paulo",
      assunto: "Alagamento",
      descricao: "Fortes chuvas causaram alagamentos...",
      img: "/assets/teste.jpg"
    },
    {
      date: "30/10/2025",
      bairro: "Centro",
      assunto: "Acidente",
      descricao: "Ocorrência registrada na avenida principal...",
      img: "/assets/teste.jpg"
    },
    {
      date: "29/10/2025",
      bairro: "Vila Maria",
      assunto: "Falta de energia",
      descricao: "Interrupção no fornecimento de energia...",
      img: "/assets/teste.jpg"
    },
    {
      date: "28/10/2025",
      bairro: "Vila Industrial",
      assunto: "Buracos na via",
      descricao: "Diversos buracos foram identificados...",
      img: "/assets/teste.jpg"
    }
  ]

  return (
    <div className={style.body}>
      <Header/>

      <main>
        <section className={style.sobre}>
          <h1 className={style.title}>Bairros onde precisa de atenção</h1>

          <div className={style.posts_container}>
            {posts.map((post, index) => (
              <div className={style.publicacao} key={index}>
                <img className={style.img_post} src={post.img} alt={`Post do bairro ${post.bairro}`} />
                <div className={style.conteudo}>
                  <span className={style.date}>{post.date}</span>
                  <h3>Bairro: <span className={style.bairro}>{post.bairro}</span></h3>
                  <h2>Assunto: <span className={style.assunto}>{post.assunto}</span></h2>
                  <span className={style.descricao}>{post.descricao}</span>
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>

      <Footer/>
    </div>
  )
}

export default Publication
