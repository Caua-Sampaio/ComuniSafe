document.getElementById('arquivo').addEventListener('change', function(event) {
    const nomeArquivoSpan = document.getElementById('nome-arquivo');

    if (this.files && this.files.length > 0) {
        // Exibe o nome do primeiro arquivo selecionado
        nomeArquivoSpan.textContent = this.files[0].name;
    } else {
    // Retorna ao texto padrão se nenhum arquivo for escolhido
    nomeArquivoSpan.textContent = 'Nenhum arquivo selecionado';
    }
});

const API_URL = "https://nongregarious-alan-wintery.ngrok-free.dev/"; // URL do seu ngrok




// Exemplo usando addEventListener
//const form = document.getElementById('forms');

//form.addEventListener('submit', function(createUser){});

//async function createUser() {
//    const user = {
//        name: document.getElementById('newName').value,
//        password: document.getElementById('newBairro').value,
 //       bairro: document.getElementById('newCidade').value,
//        cidade: document.getElementById('newPassword').value
//    };


//    const response = await fetch(${API_URL}/users, {
//        method: "POST",
//        headers: {
//        "Content-Type": "application/json"
//        },
//        body: JSON.stringify(user)
//    });

//    if (!response.ok) {
//        throw new Error("Erro ao criar usuário");
//    }

//   const data = await response.json();
//    console.log("Usuário criado:", data);
//}

////createUser();
