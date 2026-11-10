const form = document.getElementById("formCadastro");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const confirmaSenha = document.getElementById("confirmarSenha").value;
  const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;
  var objcad = { email: email, senha: senha };


  if (!apenasLetras.test(nome)) {

    alert("O campo nome deve ser preenchido com letras apenas");
  } else if (senha !== confirmaSenha) {
    alert("Senhas difevergentes, por favor digite novamente");
  } else {
    fetch("http://localhost:3003/cadLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objcad),
    })
      .then((response) => response.json()) // aqui ele formata a resposta que nos foi enviada do back
      .then((data) => {
        // esse .then pega os dados que foram enviados do back end
        console.log("Resposta do servidor:", data);

        // Aqui você acessa o 'user' que o seu backend mandou no res.json()!
        if (data.user) {
          const userId = data.user.id; // Pegando o ID do usuário

          // Agora sim, salvamos no localStorage do navegador do usuário:
          localStorage.setItem("usuarioId", userId);
          alert("Cadastrado com sucesso!");
          window.location.href = "/Proj_OrganizasaoFinanceira/Front/cadastro.html";

        } else if (data.erro) {
          alert("Erro no cadastro: " + data.erro);
        }
      });

  }




});
