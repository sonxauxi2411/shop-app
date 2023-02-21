const ProductsModel = require("../models/product.model");
const responseHandler = require("../handlers/response.handler");

//get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.find();
    responseHandler.created(res, products);
  } catch (error) {
    responseHandler.error(res);
  }
};

//get product by id
exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return responseHandler.badrequest(res, "not params");
    const product = await ProductsModel.findById(id);
    if (!product) return responseHandler.notfound(res);
    return responseHandler.created(res, product);
  } catch (error) {
    responseHandler.error(res);
  }
};


//get searched products
exports.getSearchProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const count = req.query.count || 9;
    const category = req.query.category || "all";
    // console.log(search);

    let products;
    //category === all => all products
    if (category === "all") {
      products = await ProductsModel.find({
        name: { $regex: search, $options: "i" },
      })
        .skip((page - 1) * count)
        .limit(count);
    } else {
      products = await ProductsModel.find({
        category,
        name: { $regex: search, $options: "i" },
      })
        .skip((page - 1) * count)
        .limit(count);
    }

    return responseHandler.created(res, {
      results: products,
      page,
      count,
      totalProducts: products.length,
      totalPages: Math.ceil(products.length / count),
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

//add product
exports.addProduct = async (req, res, next) => {
  try {
    const { name, category, short_desc, long_desc, photos, price, count } =
      req.body;
    // console.log(req.body);

    const product = new ProductsModel({
      name,
      category,
      short_desc,
      long_desc,
      photos,
      price,
      count,
    });
    console.log(product);
    await product.save();
    responseHandler.created(res, product);
  } catch (error) {
    responseHandler.error(res);
  }
};

//update product
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body);
    console.log(req.body);
    if (!id) return responseHandler.badrequest(res, "not params");
    const updateProduct = await ProductsModel.findByIdAndUpdate(id, {
      $set: req.body,
    });
    // console.log(updateProduct);

    return responseHandler.created(res, updateProduct);
  } catch (error) {
    return responseHandler.error(res);
  }
};

//delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) return responseHandler.badrequest(res, "not params");
    await ProductsModel.findByIdAndDelete(id);
    return responseHandler.success(res);
  } catch (error) {
    responseHandler.error(res);
  }
};
