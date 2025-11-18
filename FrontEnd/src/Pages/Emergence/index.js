import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { useState, useEffect, useRef } from 'react'

// Componente principal que exibe o botão de emergência via WhatsApp
function WhatsAppButton() {
    // controla se a mensagem está sendo "enviada" (estado do botão)
    const [sending, setSending] = useState(false)

    // número de telefone para onde a mensagem será enviada
    const phoneNumber = "5515996017417"

    // flag para evitar que a função seja chamada várias vezes seguidas
    const inProgressRef = useRef(false)

    // tenta solicitar/“esquentar” a permissão de localização para evitar lentidão quando o usuário clicar
    useEffect(() => {
        if (!navigator.permissions) return
        navigator.permissions.query({ name: 'geolocation' }).catch(() => { })
    }, [])

    // função que abre o WhatsApp já com a mensagem preenchida
    const openWhatsApp = (message) => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        // abre em uma nova aba
        window.open(url, '_blank')
    }

    // chamada quando o usuário clica no botão
    const handleClick = () => {
        // evita clique duplo
        if (inProgressRef.current) return
        inProgressRef.current = true
        setSending(true)

        // configurações rápidas da geolocalização
        const options = {
            enableHighAccuracy: false, // sem alta precisão = mais rápido
            maximumAge: 60 * 1000,     // aceita posição de até 1 minuto atrás
            timeout: 3000              // limite de 3s para resposta
        }

        // se o navegador não tiver geolocalização, envia mensagem genérica
        if (!navigator.geolocation) {
            openWhatsApp('EMERGÊNCIA! Preciso de ajuda. Não foi possível obter minha localização pelo navegador.')
            setTimeout(() => {
                inProgressRef.current = false
                setSending(false)
            }, 500)
            return
        }

        // tenta pegar localização
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // sucesso ao pegar latitude e longitude
                const { latitude, longitude } = pos.coords
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`
                const message = `EMERGÊNCIA! Preciso de ajuda neste local: ${mapsLink}`

                // abre WhatsApp com localização
                openWhatsApp(message)

                // libera o botão logo depois
                setTimeout(() => {
                    inProgressRef.current = false
                    setSending(false)
                }, 500)
            },
            (err) => {
                // se der erro ao pegar localização (negado, timeout, etc)
                console.warn('Geolocation erro:', err)
                const message = 'EMERGÊNCIA! Preciso de ajuda. Não consegui obter minha localização pelo navegador.'
                openWhatsApp(message)

                // libera o botão
                setTimeout(() => {
                    inProgressRef.current = false
                    setSending(false)
                }, 500)
            },
            options
        )
    }

    return (
        <div class="body">

            {/* Cabeçalho do site */}
            <Header />

            <main>
                <section class="sobre">

                    <h1 class="title">Emergência</h1>

                    {/* Botão de emergência centralizado */}
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <button onClick={handleClick} class="btn" disabled={sending}>
                            {sending ? 'Enviando...' : 'Enviar mensagem no WhatsApp'}
                        </button>
                    </div>

                </section>
            </main>

            {/* Rodapé */}
            <Footer />

        </div>
    )
}

export default WhatsAppButton
