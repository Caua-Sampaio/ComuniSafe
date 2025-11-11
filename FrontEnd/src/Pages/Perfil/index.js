import { useState, useEffect } from "react";
import style from "./Perfil.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";

function Perfil() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // busca o usuário logado no localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function fetchUser() {
            try {
                if (!loggedUser || !loggedUser.id) {
                    setError("Usuário não encontrado.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `https://nongregarious-alan-wintery.ngrok-free.dev/user/${loggedUser.id}`
                );

                setUser(response.data);
                setFormData(response.data);
            } catch (err) {
                setError("Erro ao carregar perfil.");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `https://nongregarious-alan-wintery.ngrok-free.dev/user/${user.id}`,
                formData
            );

            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setEditMode(false);
        } catch (err) {
            alert("Erro ao salvar alterações");
        }
    };

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

    if (error) {
        return (
            <div className={style.body}>
                <Header />
                <main className={style.container}>
                    <p>{error}</p>
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
                    <div className={style.profile_image}>
                        <img
                            src="https://i.pravatar.cc/150"
                            alt="Foto de perfil"
                        />
                    </div>

                    <div className={style.profile_info}>
                        {!editMode ? (
                            <>
                                <h2>{user.nome}</h2>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Bairro:</strong> {user.bairro}</p>
                                <p><strong>Cidade:</strong> {user.cidade}</p>

                                <button
                                    className={style.edit_button}
                                    onClick={() => setEditMode(true)}
                                >
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />
                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    className={style.input_field}
                                />

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
                                            setFormData(user);
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
