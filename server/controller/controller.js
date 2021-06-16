var Userdb = require('../model/model');
const soap = require('soap');

//Correios URL
const url =
  'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

//new variables to get the information
var Endereco, Bairro, Cidade, UF, NewCEP;
var ready = false;

//Search the zip code and each variable receive the data
function buscaCEP(cepTemp) {
  soap.createClient(url, (err, client) => {
    if (err) {
      console.log(err);
    }
    client.consultaCEP(
      {
        cep: cepTemp,
      },

      (err, res) => {
        Bairro = res.return.bairro;
        Endereco = res.return.end;
        Cidade = res.return.cidade;
        UF = res.return.uf;
        NewCEP = cepTemp.replace(/(\d{5})(\d{3})/, '$1-$2');
        ready = true;
      }
    );
  });
}

// create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  //new user
    console.log(req.body);
  var ceptemp = req.body.CEP.toString();
  buscaCEP(ceptemp);
  const user = new Userdb({
    Nome: req.body.Nome,
    Registro: req.body.Registro,
    Telefone: req.body.Telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
    Celular: req.body.Celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
    CEP: NewCEP,
    Endereco: Endereco,
    Bairro: Bairro,
    Cidade: Cidade,
    UF: UF,
    Numero: req.body.Numero,
    Complemento: req.body.Complemento,
    Especialidades: req.body.Especialidades,
  });
  //save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      console.log(user);
      res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro na criação de cadastro',
      });
    });
};

//retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Usuário não encontrado' });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Erro ao identificar o usuário' });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Aconteceu um erro na busca de cadastro',
        });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Por favor preencher todos os campos' });
  }
  
  //still needs double click
  const id = req.params.id;
  var UpdateCEP = req.body.CEP.toString();
  buscaCEP(UpdateCEP);
  req.body.Endereco = Endereco;
  req.body.Bairro = Bairro;
  req.body.Cidade = Cidade;
  req.body.UF = UF;
  req.body.CEP = NewCEP;
  req.body.Telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  req.body.Celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  
  if (ready) {
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Não foi possível atualizar o usuário com ${id}. Talvez o usuário não exista mais`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Erro ao atualizar as informações' });
      });
  }
};

//Delete a user with specified user id in the request

exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Nao foi possível deletar ${id}. Talvez id esteja errado`,
        });
      } else {
        res.send({ message: 'Usuário deletado com sucesso' });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Nao foi possível deletar usuário ${id}` });
    });
};
