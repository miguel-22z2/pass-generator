const btnFunction = document.getElementById("btnFunction");
const copyButton = document.getElementById("buttonC");
const copyIcon = document.getElementById("copyButton");
const localResult = document.getElementById("localResult");

function generatePass(tamanho) {

    if (tamanho < 8) {
        window.alert("A senha é muito curta! Digite um tamanho de senha maior!");
        return;
    }

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let senha = "";
    
    const valoresAleatorios = new Uint32Array(tamanho);
    
    window.crypto.getRandomValues(valoresAleatorios);
    
    for (let i = 0; i < tamanho; i++) {
        const indice = valoresAleatorios[i] % caracteres.length;
        senha += caracteres[indice];
    }
    
    return senha;
}

function getPass() {
    const passLenght = Number(document.getElementById("passLength").value);
    let generatedPass = generatePass(passLenght);

    localResult.textContent = generatedPass;
}

btnFunction.addEventListener('click', getPass);

copyButton.addEventListener('click', () => {
    const senha = localResult.innerText;

    if (senha === "" || senha === "Gere a senha!") {
        alert("Gere uma senha primeiro!");
        return;
    }

    navigator.clipboard.writeText(senha)
        .then(() => {
            copyIcon.className = "fa-solid fa-check";
            copyIcon.style.color = "#4a8507";

            setTimeout(() => {
                copyIcon.className = "fa-regular fa-copy";
                copyIcon.style.color = "rgb(46, 141, 84)";
            }, 2000);
        })
        .catch(err => {
            console.error("Erro ao copiar a senha: ", err);
            alert("Não foi possível copiar a senha automaticamente.");
        });
});