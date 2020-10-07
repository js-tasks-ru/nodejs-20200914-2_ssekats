const Product = require('../models/Product');

function mapProduct(oProductDocument) {
  return {
    id: oProductDocument.id,
    title: oProductDocument.title,
    images: oProductDocument.images,
    category: oProductDocument.category,
    subcategory: oProductDocument.subcategory,
    price: oProductDocument.price,
    description: oProductDocument.description,
  };
}

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const aProducts = await Product.find({$text: {$search: ctx.query.query}});
  ctx.body = {products: aProducts.map(mapProduct)};
};
