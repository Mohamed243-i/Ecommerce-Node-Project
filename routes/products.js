const express = require("express");
const router = express.Router();
const { checkToken } = require("../authantication/validate-token");
require("dotenv").config();
const {
  getAllproducts,
  getproductsByName,
  updateproductById,
  createproduct,
  deleteproductById,
  getproductsBySellerName,
} = require("../controllers/productsControllers");

//get all Products
router.get("/", (req, res, next) => {
  getAllproducts()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//get Products by productName
router.get("/getProductsbyName/:productname", checkToken, (req, res, next) => {
  // var { productname } = req.body;
  var productname = req.params.productname;

  getproductsByName(productname)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//get products By Seller Name
router.get(
  "/getproductsBySellerName/:sellername",
  checkToken,
  (req, res, next) => {
    // var { sellername } = req.body;
    var sellername = req.params.sellername;

    getproductsBySellerName(sellername)
      .then(([rows]) => {
        res.status(200).json(rows);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);
//create product by seller
router.post("/", checkToken, (req, res, next) => {
  var product = req.body;
  createproduct(product)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(422).json({ message: err.message });
    });
});

//update product By Id
router.patch("/updateProduct/:id", checkToken, (req, res, next) => {
  var productId = req.params.id;
  var product = req.body;
  updateproductById(productId, product)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//delete product
router.delete("/deleteProduct/:id", checkToken, (req, res, next) => {
  var productId = req.params.id;
  var { sellerID } = req.body;
  deleteproductById(productId, sellerID)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
