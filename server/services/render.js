const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      console.log("dd" + userdata.data.id);
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.searchRoutes = (req, res) => {
  // Make a get request to /search
  axios
    .get("http://localhost:3000/search", {
      params: { lastname: req.body.lastname },
    })
    .then(function (response) {
      if (response.length == 0) {
        console.log("EMPTY");
        res.render("index", { users: response });
      } else {
        res.render("index", { users: response.data });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
