import './New_Publications.css'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { useState } from 'react'
import axios from 'axios'

function NewPublications() {
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [moment, setMoment] = useState('')
    const [assunto, setAssunto] = useState('')
    const [descricao, setDescricao] = useState('')
    const [midia, setMidia] = useState(null)
    const [midiaURL, setMidiaURL] = useState('')
    const [usuarioId, setUsuarioId] = useState('') // novo campo
    const [responseMsg, setResponseMsg] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMidia(file)
        setMidiaURL(file ? URL.createObjectURL(file) : '')

        const span = document.getElementById('nome-arquivo')
        if (span) span.textContent = file?.name || 'Nenhum arquivo selecionado'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('usuarioId', usuarioId)
        formData.append('bairro', bairro)
        formData.append('cidade', cidade)
        formData.append('moment', moment)
        formData.append('assunto', assunto)
        formData.append('descricao', descricao)
        if (midia) formData.append('midia', midia)

        try {
            const response = await axios.post('https://nongregarious-alan-wintery.ngrok-free.dev/api/publications', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setResponseMsg(response.data)
        } catch (error) {
            setResponseMsg('Erro ao enviar publicação')
            console.error(error)
        }
    }

    return (
        <div class="body">
            <Header />

            <main>
                <section class="sobre">
                    <h1 class="title">Nova Publicação</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="input_box">
                            <input
                                type="text"
                                name="Assunto"
                                placeholder="Assunto:"
                                required
                                value={assunto}
                                onChange={(e) => setAssunto(e.target.value)}
                            />

                            <input
                                type="text"
                                name="Bairro"
                                placeholder="Nome do Bairro"
                                required
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                        </div>

                        <div class="input_box">
                            <input
                                type="text"
                                name="Cidade"
                                placeholder="Cidade"
                                required
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />

                            <input
                                type="date"
                                name="Dia"
                                id="data"
                                required
                                value={moment}
                                onChange={(e) => setMoment(e.target.value)}
                            />
                        </div>

                        <div class="input_box">
                            <input
                                type="text"
                                name="UsuarioId"
                                placeholder="ID do Usuário"
                                required
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                            />
                        </div>

                        

                        <textarea
                            name="descricao"
                            cols="30"
                            rows="10"
                            placeholder="Sua descrição"
                            required
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>

                        <input type="submit" value="Enviar mensagem" class="btn" />
                    </form>

                    {responseMsg && <p class="response">{responseMsg}</p>}
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default NewPublications