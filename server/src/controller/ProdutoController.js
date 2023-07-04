const express = require("express")
const Produto = require("../model/Produto")
const database = require("../database/database")
const Op = database.Sequelize.Op


module.exports = {

    async findAll(req, res){
        try {
            const produtoCollection = await Produto.findAll()

            res.status(201).json(produtoCollection)
        } catch (error) {
            res.status(201).json(error)
            
        }
    },


    async create(req, res){
        const {nome, tamanho, cor, preco, quantidade} = req.body
  
        /*if(!isNaN(preco) || !isNaN(quantidade)){
            res.status(400).json({erro: "O valor dos campos quantidade e preco devem ser números"});
            return
        }*/
        
        if(nome == null || tamanho == null || cor == null || preco == null || quantidade == null){
            res.status(400).json({erro: "Verifique se todos os campos estão preenchidos"});
            return
        }

        try{

            const produtoCollection = await Produto.create({
                nome: nome,
                tamanho: tamanho,
                cor: cor,
                preco: preco,
                quantidade: quantidade,
                status: 1,
            })

            res.status(201).json({msg: "Produto cadastrado com sucesso"})

        } catch (erro) {
            console.log(erro)
            res.status(400).json(erro);
        }
    },

    async delete(req, res){

        const id = req.params.id

        if(id){
            try{

                await Produto.destroy({
                    where: {
                        id: id
                    }
                })
            
                res.status(201).json({msg: "Produto deletado com sucesso"})

            } catch (erro) {

                console.log(erro)
                res.status(400).json(erro);

            }

        } else {

            res.status(400).json({erro: "ID não encontrado"});

        }
    },

    async update(req, res){
        const id = req.params.id
        const {nome, tamanho, cor, preco, quantidade} = req.body

        if(nome == "" || tamanho == "" || cor == "" || preco == "" || quantidade == ""){

            res.status(400).json({erro: "Verifique se todos os campos estão preenchidos"});
            return
        }

        if(id){
            try{

                const produtoCollection = await Produto.findOne({
                    where: {
                        id: id
                    }
                  });
            
                  if (produtoCollection) {

                    const updatedProduto = await produtoCollection.update({
                        nome: nome,
                        tamanho: tamanho,
                        cor: cor,
                        preco: preco,
                        quantidade: quantidade
                    });
              
                    res.status(201).json({msg: "Produto editado com sucesso"})

                  }else{

                    res.status(404).json({msg: "Produto não encontrado"});
                    
                  }

            } catch(erro) {
                console.log(erro)
                res.status(400).json(erro);
            }
        }else{
            res.status(400).json({erro: "ID não encontrado"});
        }
    },

    async search(req, res){
        const query = req.params.query

        try {
            let results = await Produto.findAll({
                where:{
                    nome: { [Op.like]: '%'+query+'%' }
                }
            })
            if(results){
                res.status(200).json(results)
            }else{
                res.status(400).json({error: "Não foi possível encontrar produtos"})
            }
        } catch (erro) {
            res.status(400).json(erro)
        }
    }

  
}