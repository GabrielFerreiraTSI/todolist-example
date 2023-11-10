const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

//Definindo os arrays
let items = ["Comprar Comida", "Preparar Comida", "Cozinhar Comida", "Comer Comida"]; 
let workItems = ["Mostrar tudo"];
let funItems = ["Assistir TV", "Ler um livro"];
let weekendItems = ["Relaxar", "Assistir TV"];

app.set("view engine", "ejs"); //Definir um gerador EJS
app.use(bodyParser.urlencoded({extended: true})); //Use o body-parser para analisar o HTML
app.use(express.static("public")); //Use o Express para servir ou exibir os arquivos estáticos

//Arquivo HTML padrão no servidor
app.get("/", function(req, res) {
    //Obtenha a data do sistema da função getDate exportada pelo arquivo date.js
    let day = date.getDate();
    res.render("list", {listTitle:day, newListItems:items});
});

//Exibir lista de tarefas padrão na pasta
app.post("/", function(req, res) {

    //Este código permite adicionar um novo item na lista principal e na lista de trabalho
    let item = req.body.newItem;

    //Verificar se a rota correspondente é verdadeira.
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else if(req.body.list === "Fun") {
        funItems.push(item);
        res.redirect("/fun");
    } else if(req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

//Exibir as rotas de cada lista.
app.get("/work", function(req, res) {
    let day = date.getDate();
    res.render("list", {listTitle:"Work to List", newListItems:workItems});
});

app.get("/fun", function(req, res) {
    let day = date.getDate();
    res.render("list", {listTitle:"Fun to List", newListItems:funItems});
});

app.get("/weekend", function(req, res) {
    let day = date.getDate();
    res.render("list", {listTitle:"Weekend to List", newListItems:weekendItems});
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});