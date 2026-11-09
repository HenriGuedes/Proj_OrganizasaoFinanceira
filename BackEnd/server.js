const express = require("express"); // import do framework express

const { supabase } = require("./supabase"); // 1. Importa o cliente do Supabase que você criou no outro arquivo
const cors = require("cors");
const app = express(); // executa o expresse guarda ele na varialvel app
app.use(express.json());
app.use(cors());
const usuarios = [];

// Substitua ou atualize a sua rota /teste por esta:
app.get("/teste", async function (req, res) {});

// cadastro dos gastos no banco de dados
app.post("/gastos", async function (req, res) {
  const { user_id, desc, valor, metodoDePagamento, dataDeregistro } = req.body;

  const { data, error } = await supabase
    .from("Gasto")
    .insert([
      {
        user_id: user_id,
        descricao: desc,
        valor: valor,
        forma_pagamento: metodoDePagamento,
        data_gasto: dataDeregistro,
      },
    ])
    .select();
  if (error) {
    console.log("Erro retornado pelo Supabase:", error);
    return res.status(400).json({ erro: error.message });
  }
  return res.status(201).json({
    mensagem: "Gastos cadastrado e salvo com sucesso",
    gastoCriado: data,
  });

  // Aqui você vai tratar os dados recebido
  // console.log(req.body);
  // usuarios.push(req.body);
  // res.json({ dados: req.body });
});

//Cadastro de usuario
app.post("/cadLog", async function (req, res) {
  //Envio de dados de cadastro para o banco
  const { email, senha } = req.body; // pega os dados que veio do fetch
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha,
  });
  if (error) {
    return res.status(400).json({ erro: error.message });
  }
  //envia a resposta o front
  return res.status(201).json({
    mensagem: "Usuario cadastrado com sucesso no Supabase!",
    user: data.user, // aqui vem o ID do usuario
    session: data.session, // aqui vem o token de acesso
  });
});

// validação e login d usuario ja existente
app.post("/login", async function (req, res) {
  // Aqui você vai tratar os dados recebido

  const { email, senha } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });
  if (error) {
    return res.status(401).json({ erro: "E-mail ou senha inválidos." });
  }
  return res.status(200).json({
    mensagem: "login valido.",
    usuario: {
      id: data.user.id,
      email: data.user.email,
    },
  });
});

app.listen(3003);

console.log("Cheguei aqui");
