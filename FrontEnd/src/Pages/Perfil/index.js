// Importa ferramentas e componentes necessários
import { useState, useEffect } from "react";
import style from "./Perfil.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";
import { API_URL } from "../../Context/Config";
import { useAuth } from "../../Context/AuthContext";

function Perfil() {
    // Pega usuário, logout e login do contexto global de autenticação
    const { user, logout, login } = useAuth();

    // Controla se está no modo edição
    const [editMode, setEditMode] = useState(false);

    // Armazena os campos do formulário quando estiver editando o usuário
    const [formData, setFormData] = useState({});

    // Tela de carregamento enquanto dados são carregados
    const [loading, setLoading] = useState(true);

    // Quando o usuário existir, preenche o formData com ele
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
        setLoading(false);
    }, [user]);

    // Atualiza o objeto formData conforme o usuário digita
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Salva os dados modificados do usuário no backend
    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/user/${user.id}`,
                formData,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            // Atualiza o usuário globalmente no contexto de autenticação
            login(response.data);

            // Fecha modo edição
            setEditMode(false);

        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
            alert("Erro ao salvar alterações");
        }
    };

    // Exibe uma tela de carregamento enquanto busca dados
    if (loading) {
        return (
            <div className={style.body}>
                <Header />
                <main className={style.container}>
                    <p>Carregando...</p>
                </main>
                <Footer />
            </div>
        );
    }

    // Caso nenhum usuário esteja logado, exibe aviso
    if (!user) {
        return (
            <div className={style.body}>
                <Header />
                <main className={style.container}>
                    <p>Nenhum usuário logado.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={style.body}>
            <Header />

            <main className={style.container}>
                <section className={style.profile_card}>
                    {/* Foto de perfil fake só pra ilustrar */}
                    <div className={style.profile_image}>
                        <img
                            src="https://i.pravatar.cc/150"
                            alt="Foto de perfil"
                        />
                    </div>

                    <div className={style.profile_info}>
                        {/* Se NÃO estiver editando, só exibe as informações */}
                        {!editMode ? (
                            <>
                                <h2>{user?.nome || "Usuário"}</h2>
                                <p><strong>Email:</strong> {user?.email || "—"}</p>
                                <p><strong>Bairro:</strong> {user?.bairro || "—"}</p>
                                <p><strong>Cidade:</strong> {user?.cidade || "—"}</p>

                                {/* Botão que habilita modo edição */}
                                <button
                                    className={style.edit_button}
                                    onClick={() => setEditMode(true)}
                                >
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            // Se estiver em modo edição, exibe inputs para alteração
                            <>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome || ""}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="bairro"
                                    value={formData.bairro || ""}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade || ""}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />

                                {/* Botões de salvar ou cancelar */}
                                <div className={style.edit_buttons}>
                                    <button
                                        className={style.save_button}
                                        onClick={handleSave}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className={style.cancel_button}
                                        onClick={() => {
                                            setEditMode(false);
                                            setFormData(user); // Restaura valores originais
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Perfil;
