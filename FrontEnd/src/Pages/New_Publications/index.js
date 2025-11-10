import './New_Publications.css'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { Link, useNavigate } from "react-router-dom";
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
    const [usuarioId, setUsuarioId] = useState('')
    const [responseMsg, setResponseMsg] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMidia(file)
        setMidiaURL(file ? URL.createObjectURL(file) : '')
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
            const response = await axios.post(
                'https://nongregarious-alan-wintery.ngrok-free.dev/api/post/inserir',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            // verifica se é objeto ou string
            const msg = typeof response.data === 'string' ? response.data : response.data.message
            setResponseMsg(msg)

            // limpa campos
            setBairro('')
            setCidade('')
            setMoment('')
            setAssunto('')
            setDescricao('')
            setUsuarioId('')
            setMidia(null)
            setMidiaURL('')
        } catch (error) {
            setResponseMsg('Erro ao enviar publicação')
            console.error(error)
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

                        <div className="input_box">
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
                                required
                                value={moment}
                                onChange={(e) => setMoment(e.target.value)}
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

{/*
                        <div className="input_box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {midiaURL && (
                                <img
                                    src={midiaURL}
                                    alt="Preview da mídia"
                                    style={{ width: '150px', marginTop: '10px' }}
                                />
                            )}
                        </div>
                        */}

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