const db = require("../utlis/db");

//get all product
function getAllproducts() {
  return db.execute("SELECT * FROM products ");
}
//getproductsByName serch by name for  seller
function getproductsByName(name) {
  return db.execute("SELECT * FROM products WHERE name=? ", [name]);
}
//getproductsBySellerName serch by name for  seller
function getproductsBySellerName(name) {
  return db.execute(
    "SELECT * FROM products p INNER JOIN sellers S on p.seller_id=s.id WHERE s.name=? ",
    [name]
  );
}

//getAllproducts sea all products for a spasific sellers
function getAllproductsForSeller(sellerId) {
  return db.execute(
    "SELECT * FROM products p INNER JOIN sellers S on p.seller_id=? ",
    [sellerId]
  );
}

//updateproductById  edit a product by id for sellers
function updateproductById(productId, product) {
  return db.execute(
    "UPDATE products SET name=? ,image=?, description=?  WHERE id=? &&  seller_id=? ",
    [
      product.name,
      product.image,
      product.description,
      productId,
      product.seller_id,
    ]
  );
}

//deleteproductById delete a product by id for sellers
function deleteproductById(productId, sellerId) {
  return db.execute("DELETE FROM products WHERE id=?  &&  seller_id=? ", [
    productId,
    sellerId,
  ]);
}

//create product a product for sellers
function createproduct(product) {
  return db.execute(
    "INSERT INTO products  ( name,image, description, seller_id) VALUES (?,?,?,?) ",
    [ product.name,
      product.image,
      product.description,
      product.seller_id,]
  );
}

module.exports = {
  getAllproducts,
  getproductsByName,
  updateproductById,
  createproduct,
  deleteproductById,
  getproductsBySellerName,
  getAllproductsForSeller,
};
