const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((LoginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: LoginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.error(err);
    res.status(400).json("Unable to register");
  });
};

export default handleRegister;
