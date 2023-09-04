const handleProfile = (req, res, db) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("no such user");
      }
    })
    .catch((error) => {
      res.status(500).json("Error fetching user");
    });
};

export default handleProfile;
