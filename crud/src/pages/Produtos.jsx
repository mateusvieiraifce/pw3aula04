import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import api from '../api/axiosConfig'; // Importando a configuração do axios
function Produtos() {


  /// metodo para carrer on load
  useEffect(()=>{
    getAllProdutos();
  },[]);
  /// dados do formulário
  const [dadosProduto,setDadosProduto] = React.useState({
    name:"",
    barCode:"",
    tipoProdutoId:"",
    price:"",
    quantidade:"",
    id:""
  });

  //resultado da consulta
  const [resultado, setResultado] = React.useState();

  //setando os dados que o operador do sitema está digitando.
  const inputData = (e)=>{
    setDadosProduto({
      ...dadosProduto,
      [e.target.name]:e.target.value
    })
  }

  //chamando back-and para criar um dado
  const saveData = async (e)  =>{
    e.preventDefault();

    if (dadosProduto.id =="") {

    const resposta = await api.post('/produtos',
      dadosProduto).then((res)=>{
        console.log(res);
        if (res.status == 201){
          setDadosProduto({
              name:"",
              barCode:"",
              tipoProdutoId:"",
              price:"",
              quantidade:""
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


       const resposta = await api.put('/produtos/'+dadosProduto.id,
      dadosProduto).then((res)=>{
        console.log(res);
        if (res.status == 200){
          setDadosProduto({
              name:"",
              barCode:"",
              tipoProdutoId:"",
              price:"",
              quantidade:"",
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
      getAllProdutos();
  }

  // chamando backand para trazer todos os usuários
  const getAllProdutos = async (e)=>{
    const consulta = await api.get("/produtos");
    console.log(consulta.data);
    setResultado(consulta.data.produtos);
  }

  const functionEdit = async (e)=>{
     const getProduto = await api.get("/produtos/"+e).then((res)=>{
      console.log(res.data);
      setDadosProduto({
        name:res.data.produtct.name,
        barCode:res.data.produtct.barCode,
        tipoProdutoId:res.data.produtct.tipoProdutoId,
        price: res.data.produtct.price,
        quantidade: res.data.produtct.quantidade,
        id:res.data.produtct.id
      });

     }).catch((res)=>{
        console.log(res);

     });  

//      alert("chegou aqy"+e);

  }

  // chamando backend para remover um usuário
  const removeFunct =  async (e)=>{

    if (!window.confirm("Deseja realmente excluir este produto?")) {
      return;
    }

    try {
     const callDelete = api.delete("/produtos/delete/"+e).then(
      (res)=>{
        alert("Apagado com sucesso!!");
        getAllProdutos()
      }
     )
  
    }catch(e){
      alert(e);
    }
  }

  // pagina
    return(
         <div className="page-content">
      <h1>Gerenciamento de Produtos</h1>
      

      <form onSubmit={saveData}>
        Nome:
        <br></br>
        <input type="text" name="name" required placeholder="Nome" value={dadosProduto.name} onChange={inputData}></input>
        <br></br>
        Código de barras:
        <br></br>
        <input type="number" name="barCode" required placeholder="Código de barras" value={dadosProduto.barCode} onChange={inputData}></input>
        <br></br>
        Tipo de produto:
        <br></br>
        <input type="text" name="tipoProdutoId" required placeholder="Tipo de produto" value={dadosProduto.tipoProdutoId} onChange={inputData}></input>
        <br></br>
        Preço:
        <br></br>
        <input type="text" name="price" required placeholder="Preço" value={dadosProduto.price} onChange={inputData}></input>
        <br></br>
        Quantidade:
        <br></br>
        <input type="number" name="quantidade" required placeholder="Quantidade" value={dadosProduto.quantidade} onChange={inputData}></input>
        <br></br>
        <button type="submit">Enviar</button>
        <button type="button" onClick={getAllProdutos}>Listar</button>
        <div className="tabela"> 

          <table style={{ border:1 , borderStyle:"double"}}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código de barras:</th>
                <th>Tipo de produto:</th>
                <th>Preço:</th>
                <th>Quantidade:</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {resultado && resultado.map((produto, index) => (
                    <tr key={index}>
                        <td>{produto.name} </td>
                        <td>{produto.barCode}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.price}</td>
                        <td>{produto.quantidade}</td>
                       
                        <td><button type="button"  onClick={(e)=>{
                          functionEdit(produto.id)

                        }}>Editar</button></td>
                        <td><button type="button" 
                        onClick={(e)=>{
                          removeFunct(produto.id)
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

export default Produtos;