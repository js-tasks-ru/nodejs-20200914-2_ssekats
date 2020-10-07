const Product = require('../models/Product');

function documentToProductMapper(aProductDocument) {
  const aProducts = [];
  aProductDocument.forEach((oProductDocument) => {
    const oProduct = oProductDocument.toObject();
    aProducts.push({
      id: oProduct._id.toString(),
      title: oProduct.title,
      images: oProduct.images,
      category: oProduct.category._id.toString(),
      subcategory: oProduct.subcategory.toString(),
      price: oProduct.price,
      description: oProduct.description,
    });
  });
  return aProducts;
}

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  if (!Object.keys(ctx.query).length) {
    return next();
  } else {
    const sSubCategoryId = ctx.query.subcategory;
    const aProductDocument = await Product.find({subcategory: sSubCategoryId})
        .populate('category');
    const aProducts = documentToProductMapper(aProductDocument);
    ctx.body = {products: aProducts};
  }
};

module.exports.productList = async function productList(ctx, next) {
  const aProductDocument = await Product.find({}).populate('category');
  const aProducts = documentToProductMapper(aProductDocument);
  ctx.body = {products: aProducts};
};

module.exports.productById = async function productById(ctx, next) {
  const sProductId = ctx.params.id;
  let oProductDocument;
  try {
    oProductDocument = await Product.findById(sProductId).populate('category');
  } catch (error) {
    ctx.throw(400, error.message);
  }
  if (!oProductDocument) {
    ctx.throw(404);
  }
  const aProducts = documentToProductMapper([oProductDocument]);
  ctx.body = {product: aProducts[0]};
};

