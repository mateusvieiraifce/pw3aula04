import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import api from '../api/axiosConfig'; // Importando a configuração do axios
function Usuario() {


  /// metodo para carrer on load
  useEffect(()=>{
    getAllUsuario();
  },[]);
  /// dados do formulário
  const [dadosUsuario,setDadosUsuario] = React.useState({
    name:"",
    email:"",
    password:"",
    id:""
  });

  //resultado da consulta
  const [resultado, setResultado] = React.useState();

  //setando os dados que o operador do sitema está digitando.
  const inputData = (e)=>{
    setDadosUsuario({
      ...dadosUsuario,
      [e.target.name]:e.target.value
    })
  }

  //chamando back-and para criar um dado
  const saveData = async (e)  =>{
    e.preventDefault();

    if (dadosUsuario.id =="") {

    const resposta = await api.post('/users',
      dadosUsuario).then((res)=>{
        console.log(res);
        if (res.status == 201){
          setDadosUsuario({
              name:"",
              email:"",
              senha:""
          });

          alert("Salvo com sucesso");
        }
      }
    
    ).catch((res)=>{
        console.log(res);
        if (res.response) {
        alert("Erro " + res.response.data.message);
        } else{
          alert("Erro " );
        }
      });
    } else{


       const resposta = await api.put('/users/'+dadosUsuario.id,
      dadosUsuario).then((res)=>{
        console.log(res);
        if (res.status == 200){
          setDadosUsuario({
              name:"",
              email:"",
              password:"",
              id:""
          });
          alert("Salvo com sucesso");
        }
      }
    
    ).catch((res)=>{
        console.log(res);
        if (res.response) {
        alert("Erro " + res.response.data.message);
        } else{
          alert("Erro " );
        }
      });



          
    }
      getAllUsuario();
  }

  // chamando backand para trazer todos os usuários
  const getAllUsuario = async (e)=>{
    const consulta = await api.get("/users");
    setResultado(consulta.data.users);
  }

  const functionEdit = async (e)=>{
     const getUsuario = await api.get("/users/"+e).then((res)=>{
      console.log(res.data.user);
      setDadosUsuario({
        name:res.data.user.name,
        email:res.data.user.email,
        password:res.data.user.password,
        id: res.data.user.id
      });

     }).catch((res)=>{
        console.log(res);

     });  

      alert("chegou aqy"+e);

  }

  // chamando backend para remover um usuário
  const removeFunct =  async (e)=>{

    if (!window.confirm("Deseja realmente excluir este usuario?")) {
      return;
    }

    try {
     const callDelete = api.delete("/usuario/"+e).then(
      (res)=>{
        alert("Apagado com sucesso!!");
        getAllUsuario()
      }
     )
  
    }catch(e){
      alert(e);
    }
  }

  // pagina
    return(
         <div className="page-content">
      <h1>Gerenciamento de Usuarios</h1>
      

      <form onSubmit={saveData}>
        Nome:
        <br></br>
        <input type="text" name="name" required placeholder="Nome" value={dadosUsuario.name} onChange={inputData}></input>
        <br></br>
        Email:
        <br></br>
        <input type="text" name="email" required placeholder="email" value={dadosUsuario.email} onChange={inputData}></input>
        <br></br>
        Senha:
        <br></br>
        <input type="text" name="password" required placeholder="senha" value={dadosUsuario.password} onChange={inputData}></input>
        <br></br>
        <button type="submit">Enviar</button>
        <button type="button" onClick={getAllUsuario}>Listar</button>
        <div className="tabela"> 

          <table style={{ border:1 , borderStyle:"double"}}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>senha</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {resultado && resultado.map((usuario, index) => (
                    <tr key={index}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.password}</td>
                       
                        <td><button type="button"  onClick={(e)=>{
                          functionEdit(usuario.id)

                        }}>Editar</button></td>
                        <td><button type="button" 
                        onClick={(e)=>{
                          removeFunct(usuario.id)
                        }}
                        >Excluir</button></td>
                         
                    </tr>
                ))}
            </tbody>
          </table>

        </div>
      </form>
      
    </div>
    );
}

export default Usuario;