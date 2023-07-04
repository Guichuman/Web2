const express = require("express")
const routes = express.Router();
const UserController = require("../controller/UserController")
const ProdutoController = require("../controller/ProdutoController")
const VendaController = require("../controller/VendaController")
const AuthMiddleware = require("../middleware/AuthMiddleware")

routes.get("/", (req, res) => {
    res.send("rodando")
});

routes.post('/users', UserController.create);
routes.post('/auth', UserController.auth);
routes.delete("/users/:email", UserController.delete)
routes.put("/users/:email", UserController.update)
routes.get("/users/:email", UserController.findByEmail)
routes.post("/users/:email", UserController.verificaSenha)
routes.post("/password/:email", UserController.updateSenha)
//routes.get("/users/:id", UserController.acesso)

routes.get('/produtos', ProdutoController.findAll);
routes.post('/produtos', ProdutoController.create);
routes.delete("/produtos/:id", ProdutoController.delete)
routes.put("/produtos/:id", ProdutoController.update)
routes.get('/produtos/:query', ProdutoController.search);

routes.get('/vendas', AuthMiddleware, VendaController.findAll);
routes.post('/vendas', VendaController.create);
routes.delete("/vendas/:id", VendaController.delete)
routes.put("/vendas/:id", VendaController.update)


module.exports = routes;