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