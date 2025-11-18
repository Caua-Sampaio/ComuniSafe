import './New_Publications.css'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { API_URL } from "../../Context/Config";

function NewPublications() {
    const { user } = useAuth() // pega o usuário logado pelo contexto

    // estados dos inputs do formulário
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [moment, setMoment] = useState('')
    const [assunto, setAssunto] = useState('')
    const [descricao, setDescricao] = useState('')

    // estados para arquivo de mídia
    const [midia, setMidia] = useState(null)      // arquivo real
    const [midiaURL, setMidiaURL] = useState(null) // preview da imagem

    // mensagem de resposta do servidor
    const [responseMsg, setResponseMsg] = useState('')

    // quando o usuário seleciona um arquivo
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMidia(file)

        // cria preview da imagem se existir
        if (file) {
            setMidiaURL(URL.createObjectURL(file))
        } else {
            setMidiaURL(null)
        }
    }

    // enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault()

        // segurando caso o user não esteja logado
        if (!user) {
            setResponseMsg('Usuário não autenticado')
            return
        }

        // objeto com os dados textuais do post
        const postObject = {
            usuarioId: user.id || user.usuarioId, // id do usuário
            bairro,
            cidade,
            moment,
            assunto,
            descricao
        }

        // usa FormData para permitir envio de arquivo
        const formData = new FormData()
        formData.append('postArray', JSON.stringify(postObject)) // backend espera como string JSON

        // se tiver mídia, envia junto
        if (midia) {
            formData.append('midia', midia)
        }

        console.log("FormData enviado:", [...formData.entries()])

        try {
            // requisição ao backend
            const response = await axios.post(`${API_URL}/post/inserir`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            // trata a resposta (string ou objeto)
            const msg = typeof response.data === 'string' ? response.data : response.data.message
            setResponseMsg(msg)

            // limpa o form após envio
            setBairro('')
            setCidade('')
            setMoment('')
            setAssunto('')
            setDescricao('')
            setMidia(null)
            setMidiaURL(null)

        } catch (error) {
            console.error('Erro ao enviar publicação:', error)

            // mostra resposta do servidor em caso de erro
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

                    {/* formulário de criação do post */}
                    <form onSubmit={handleSubmit}>
                        <div className="input_box">
                            <input 
                                type="text" 
                                placeholder="Assunto:" 
                                required 
                                value={assunto} 
                                onChange={e => setAssunto(e.target.value)} 
                            />

                            <input 
                                type="text" 
                                placeholder="Nome do Bairro" 
                                required 
                                value={bairro} 
                                onChange={e => setBairro(e.target.value)} 
                            />
                        </div>

                        <div className="input_box">
                            <input 
                                type="text" 
                                placeholder="Cidade" 
                                required 
                                value={cidade} 
                                onChange={e => setCidade(e.target.value)} 
                            />

                            <input 
                                type="date" 
                                required 
                                value={moment} 
                                onChange={e => setMoment(e.target.value)} 
                            />
                        </div>

                        <div className="input_box">
                            {/* input de imagem */}
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />

                            {/* preview da imagem selecionada */}
                            {midiaURL && (
                                <img
                                    src={midiaURL}
                                    alt="Preview da mídia"
                                    style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }}
                                />
                            )}
                        </div>

                        {/* descrição do post */}
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder="Sua descrição"
                            required
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        ></textarea>

                        {/* botão de criar post */}
                        <input 
                            type="submit" 
                            value="Criar novo post" 
                            className="btn" 
                        />
                    </form>

                    {/* mensagem de sucesso/erro */}
                    {responseMsg && <p className="response">{responseMsg}</p>}
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default NewPublications
