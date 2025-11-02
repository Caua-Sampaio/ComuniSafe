import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import { useState, useEffect, useRef } from 'react'

function WhatsAppButton() {
    const [sending, setSending] = useState(false)
    const phoneNumber = "5515996017417"
    const inProgressRef = useRef(false)

    // tenta "aquecer" a permissão pra reduzir atraso quando for de fato necessário
    useEffect(() => {
        if (!navigator.permissions) return
        navigator.permissions.query({ name: 'geolocation' }).catch(() => { })
    }, [])

    const openWhatsApp = (message) => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        // abre numa nova aba/janela
        window.open(url, '_blank')
    }

    const handleClick = () => {
        if (inProgressRef.current) return
        inProgressRef.current = true
        setSending(true)

        // opções: timeout curto para emergência
        const options = {
            enableHighAccuracy: false, // false = mais rápido em geral
            maximumAge: 60 * 1000,     // aceita posição com até 1 min (cache)
            timeout: 3000              // 3 segundos só — se não responder, fallback
        }

        if (!navigator.geolocation) {
            // fallback imediato se não suportar
            openWhatsApp('EMERGÊNCIA! Preciso de ajuda. Não foi possível obter minha localização pelo navegador.')
            setTimeout(() => {
                inProgressRef.current = false
                setSending(false)
            }, 500)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`
                const message = `EMERGÊNCIA! Preciso de ajuda neste local: ${mapsLink}`
                openWhatsApp(message)
                // libera botão rapidamente
                setTimeout(() => {
                    inProgressRef.current = false
                    setSending(false)
                }, 500)
            },
            (err) => {
                // se der erro (timeout, denied, etc) manda mensagem de emergência sem coords
                console.warn('Geolocation erro:', err)
                const message = 'EMERGÊNCIA! Preciso de ajuda. Não consegui obter minha localização pelo navegador.'
                openWhatsApp(message)
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

            <Header />

            <main>
                <section class="sobre">

                    <h1 class="title">Emergência</h1>

                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <button onClick={handleClick} class="btn" disabled={sending}>
                            {sending ? 'Enviando...' : 'Enviar mensagem no WhatsApp'}
                        </button>
                    </div>

                </section>
            </main>

            <Footer />

        </div>
    )
}

export default WhatsAppButton