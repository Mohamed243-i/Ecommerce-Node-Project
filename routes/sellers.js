const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { checkToken } = require("../authantication/validate-token");
require("dotenv").config();
const {
  createSeller,
  getSellerByEmail,
} = require("../controllers/sellersControlers");

// Create a new seller
router.post("/", (req, res, next) => {
  createSeller(req.body)
    .then((result) => {
      res.status(201).json({ message: "seller created!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
//login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  //Check if the user exists in the database
  getSellerByEmail(email)
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        const user = result[0][0];
        // console.log(user.password);
        const isPasswordMatch = bcryptjs.compareSync(password, user.password);

        if (isPasswordMatch) {
          console.log(user);
          const payload = { email: user.email };
          console.log(payload);
          const token = jwt.sign(payload, "secretkeyWMF", { expiresIn: "1h" });
          res.status(200).json({ message: "Success login", token: token });
        } else {
          console.log("not ok");
          res.status(401).json({ message: "Invalid email or password" });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "err" });
    });
});

module.exports = router;
