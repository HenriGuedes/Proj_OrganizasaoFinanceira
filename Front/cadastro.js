var formulario = document.getElementById("formGasto");

formulario.addEventListener("submit", function (event) {
  // tipo "submit" de envio
  event.preventDefault(); // trava o recarregamento da pag
  var descricao = document.getElementById("description").value;
  var valor = document.getElementById("amount").value;
  var metodoDePagamento = document.getElementById("payment-method").value;
  var dataDeregistro = document.getElementById("date").value;
  var usuarioId = localStorage.getItem("usuarioId");

  var objGastos = [
    {
      user_id: usuarioId,
      desc: descricao,
      valor: valor,
      metodoDePagamento: metodoDePagamento,
      dataDeregistro: dataDeregistro,
    },
  ];

  fetch("http://localhost:3003/gastos", {
    // fecth com o metodo post mandando os dados para o back
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objGastos), // ja mandando formatado o nosso objeto
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.erro) {
        alert("Erro ao salvar gastos", data.erro);
      }
      console.log("Gastos salvos com sucesso", data);
      alert("Gastos cadastrados");
    })
    .catch((error) => {
      console.error("Erro ao salvar gastos", error);
    });

  console.log(objGastos);
});
