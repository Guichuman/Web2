const express = require("express")
const User = require("../model/User")
const database = require("../database/database")
const Op = database.Sequelize.Op
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

require('dotenv').config();


const secret = process.env.JWT_SECRET

function isEmpty(value){
    return (value == null || value === "string" && value.trim().length === 0 || value == null || value == undefined)
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = {


    async auth(req, res){
        let {email, password} = req.body

        if(email == "" || password == ""){
            res.status(400)
            res.json({error: "Preencha todos os dados"})
            return
        }

        let user = await User.findOne({
            where: {
                email: email
            }
        });

        if(user){

            let result = await bcrypt.compare(password, user.password)

            if(result){

                let token = jwt.sign({email: email}, secret, {
                    expiresIn: 5000
                })
               
                user.increment('acesso', { by: 1})

                res.status(200)
                res.json({ token: token, auth: true, user_id: user.id})
            }else{
                res.status(406)
                res.json({error: "Senha incorreta"})
            }

           
        }else{
            res.status(400)
            res.json({error: "Usuário não encontrado"})
        }

    },

    async create(req, res){

        let {nome, email, password} = req.body

        if(isEmpty(nome) || isEmpty(email) || isEmpty(password)){

            res.status(400)
            res.json({error: "'Verifique se todos os campos estão preenchidos'"});
            return
        }

        let emailExistente = await User.findOne({
            where: {
                email: email
            }
          });

        if(emailExistente){
            res.status(406)
            res.json({error: "Email já cadastrado"});
            return

        }

        if(validateEmail(email) == false){
            res.status(406)
            res.json({error: "Email inválido"});
            return
        }

        try{
            let hash = await bcrypt.hash(password, 10)

            let userCollection = await User.create({
                nome: nome,
                email: email,
                password: hash,
                status: 1,
                acesso: 0
            })

            res.status(201)
            res.json({msg: "Usuário criado com sucesso"})

        }catch (erro) {

            console.log(erro)
            res.status(400)
            res.json({error: "Não foi possivel criar o usuário"});

        }
    },

    async delete(req, res){

        let email = req.params.email

        if(email){
            try{

                await User.destroy({
                    where: {
                        email: email
                    }
                })
            
                res.status(201)
                res.json({error: "Usuário deletado com sucesso"})

            }catch (erro) {

                console.log(erro)
                res.status(400)
                res.json({erro: "Não foi possivel deletar o usuário"});

            }

        }else{
            res.status(400)
            res.json({error: "ID não encontrado"});
        }
    },

    async update(req, res){ 

        let {nome, email} = req.body
        let emailUser = req.params.email

        if(emailUser){
            try{

                let userCollection = await User.findOne({
                    where: {
                        email: emailUser
                    }
                  });
            
                if (userCollection) {

                    let updatedUser = await userCollection.update({
                        nome: nome,
                        email: email
                    });
              
                    res.status(201)
                    res.json({msg: "Usuário editado com sucesso"})

                  } else {
                    res.status(404)
                    res.json({error: "Usuário não encontrado"});
                  }

            }catch(erro){
                console.log(erro)
                res.status(400)
                res.json({error: "Não foi possível atualizar os dados"});
            }
        }else{
            res.status(400)
            res.json({error: "ID não encontrado"});
        }
    },

    async acesso(req, res){
        let id = req.params.id

        try {
            let user = await User.findByPk(id);

              if(user){
                res.status(200)
                res.json(user.acesso)
              }else{
                res.status(402)
                res.json({error: "Usuário não encontrado"})
              }
        } catch (error) {
            res.status(400)
            res.json({error: "Não foi possível encontrar os acessos"})
        }  
    },

    async findByEmail(req, res){
        let email = req.params.email

        try {
            
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
    
            if(user){
                res.status(200).json(user)
                return
            }else{
                res.status(400).json({msg: "aaaaaaa"})
                return
            }
        } catch (error) {
            res.status(400).json({msg: "Não foi possivel encontrar o usuário"})
        }
    },

    async verificaSenha(req, res){
        let {password, email} = req.body
        if(password !== "" || email !== ""){

            try {
                let userCollection = await User.findOne({
                    where: {
                        email: email
                    }
                  });

                  if(userCollection){

                      let result = await bcrypt.compare(password, userCollection.password)
    
                      if(result){
                          res.status(200).json(userCollection)
                      }else{
                        res.status(400).json({error: "Senha não correspondente"})
                      }
                  }else{
                    res.status(400).json({error: "Email não cadastrado"})
                  }


            } catch (error) {
                res.status(400).json({error: "Não foi possível validar a senha"})
            }

        }else{
            res.status(400).json({msg: "Preencha todos os dados"})
        }
    },

    async updateSenha(req, res){
        let {password, email} = req.body
        try {
            let userCollection = await User.findOne({
                where: {
                    email: email
                }
              });

              if(userCollection){

                  let hash = await bcrypt.hash(password, 10)

                  let result = await userCollection.update({
                    password: hash
                  })

                  if(result){
                      res.status(200).json(userCollection)
                  }else{
                    res.status(400).json({error: "Não foi possível alterar a senha"})
                    return
                  }
              }else{
                res.status(400).json({error: "Email não cadastrado"})
                return

              }
        } catch (error) {
            res.status(400).json({error: "Não foi possível alterar a senha"})
            return
        }
    }
}