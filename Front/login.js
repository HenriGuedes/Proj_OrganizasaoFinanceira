var formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", function (event) {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;
  event.preventDefault();

  var loginObg = { email: email, senha: senha };

  fetch("http://localhost:3003/login", {
    // fecth com o metodo post mandando os dados para o back
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginObg), // ja mandando formatado o nosso objeto
  })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      if (data.erro) {
        alert("erro ao fazer login", data.erro);
        return;
      }
      console.log("Login realizado com sucesso", data);
      alert("Login realizado");
      //Direcionamento para a pag cadastro
      window.location.href = "./cadastro.html";
    })
    .catch((error) => {
      console.error("erro ao fazer login", error);
    });
});
