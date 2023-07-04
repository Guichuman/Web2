const express = require("express")
const Venda = require("../model/Venda")
const Produto = require("../model/Produto")
const database = require("../database/database")
const Op = database.Sequelize.Op

module.exports = {

    async findAll(req, res){
        try {

            const vendaCollection = await Venda.findAll()

            res.status(201).json(vendaCollection)

        } catch (error) {

            res.status(201).json(error)
            
        }
    },


    async create(req, res){

        const {desconto, preco_final, produtoId} = req.body

        if(desconto == "" || preco_final == ""){

            res.status(400).json({erro: "Verifique se todos os campos estão preenchidos"});
            return

        }

        try{
            const produto = await Produto.findByPk(produtoId)

            if(!produto){
                res.status(404).json({msg: "Produto não encontrado"})
                return
            }
            
            if(produto.dataValues.quantidade == 0){
                res.status(400).json({erro: "Produto sem estoque"})
                return
            }

            const vendaCollection = await Venda.create({
                desconto: desconto,
                preco_final: preco_final,
                produtoId: produtoId,
                status: 1,
            })

            

            produto.decrement('quantidade', { by: 1})

            res.status(201).json({msg: "Venda cadastrada com sucesso"})

        } catch(erro) {

            console.log(erro)
            res.status(400).json({erro: "Não foi possivel realizar o cadastro"});

        }
    },

    async delete(req, res){
        const id = req.params.id
        if(id){
            try{
                await Venda.destroy({
                    where: {
                        id: id
                    }
                })
            
                res.status(201).json({msg: "Venda deletada com sucesso"})

            } catch (erro) {
                console.log(erro)
                res.status(400).json(erro);
            }
        }else{
            res.status(400).json({erro: "ID não encontrado"});
        }
    },

    async update(req, res){
        const id = req.params.id

        if(id){
            try{
                const vendaCollection = await Venda.findOne({
                    where: {
                        id: id
                    }
                  });
            
                  if (vendaCollection) {

                    const updatedVenda = await vendaCollection.update({
                        desconto: req.body.desconto,
                        preco_final: req.body.preco_final,
                        produtoId: req.body.produtoId
                    });
              
                    res.status(201).json({msg: "Venda editada com sucesso"})

                  }else{
                    res.status(404).json({msg: "Venda não encontrada"});
                  }

            } catch(erro) {
                console.log(erro)
                res.status(400).json(erro);
            }
        }else{
            res.status(400).json({erro: "ID não encontrado"});
        }
    }
}