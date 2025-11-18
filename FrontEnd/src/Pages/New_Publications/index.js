import './New_Publications.css'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { API_URL } from "../../Context/Config";

function NewPublications() {
    const { user } = useAuth()

    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [moment, setMoment] = useState('')
    const [assunto, setAssunto] = useState('')
    const [descricao, setDescricao] = useState('')
    const [midia, setMidia] = useState(null)
    const [midiaURL, setMidiaURL] = useState(null)
    const [responseMsg, setResponseMsg] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMidia(file)

        if (file) {
            setMidiaURL(URL.createObjectURL(file))
        } else {
            setMidiaURL(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setResponseMsg('Usuário não autenticado')
            return
        }

        // Monta o objeto do post
        const postObject = {
            usuarioId: user.id || user.usuarioId,
            bairro,
            cidade,
            moment,
            assunto,
            descricao
        }

        // Cria FormData
        const formData = new FormData()
        formData.append('postArray', JSON.stringify(postObject))
        if (midia) {
            formData.append('midia', midia)
        }

        console.log("FormData enviado:", [...formData.entries()])

        try {
            const response = await axios.post(`${API_URL}/post/inserir`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const msg = typeof response.data === 'string' ? response.data : response.data.message
            setResponseMsg(msg)

            // limpa campos
            setBairro('')
            setCidade('')
            setMoment('')
            setAssunto('')
            setDescricao('')
            setMidia(null)
            setMidiaURL(null)

        } catch (error) {
            console.error('Erro ao enviar publicação:', error)
            if (error.response) {
                console.log('Resposta do servidor:', error.response.data)
            }
            setResponseMsg('Erro ao enviar publicação')
        }
    }

    return (
        <div className="body">
            <Header />
            <main>
                <section className="sobre">
                    <h1 className="title">Nova Publicação</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input_box">
                            <input type="text" placeholder="Assunto:" required value={assunto} onChange={e => setAssunto(e.target.value)} />
                            <input type="text" placeholder="Nome do Bairro" required value={bairro} onChange={e => setBairro(e.target.value)} />
                        </div>
                        <div className="input_box">
                            <input type="text" placeholder="Cidade" required value={cidade} onChange={e => setCidade(e.target.value)} />
                            <input type="date" required value={moment} onChange={e => setMoment(e.target.value)} />
                        </div>
                        <div className="input_box">
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {midiaURL && (
                                <img src={midiaURL} alt="Preview da mídia" style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }} />
                            )}
                        </div>
                        <textarea cols="30" rows="10" placeholder="Sua descrição" required value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
                        <input type="submit" value="Criar novo post" className="btn" />
                    </form>
                    {responseMsg && <p className="response">{responseMsg}</p>}
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default NewPublications
