var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  //new user
  const user = new Userdb({
    Nome: req.body.Nome,
    CRM: req.body.CRM,
    Telefone: req.body.Telefone,
    Celular: req.body.Celular,
    CEP: req.body.CEP,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
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
  const id = req.params.id;
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
