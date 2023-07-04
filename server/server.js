const express = require("express");
const routes = require("./src/routes/routes")
const database = require("./src/database/database")
const bodyParser = require("body-parser")
const UserModel = require("./src/model/User")
const cors = require("cors")

/*
const ProdutoModel = require("./src/model/Produto")
const VendaModel = require("./src/model/Venda")
*/

const app = express();
//UserModel.sync({force:true})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/",routes);

database.authenticate()
  .then(() => {
      console.log('conectado no banco')
  }).catch((error) => {
      console.log(error)
  })

app.listen(8000, () => console.log("rodando"));

module.exports = app

