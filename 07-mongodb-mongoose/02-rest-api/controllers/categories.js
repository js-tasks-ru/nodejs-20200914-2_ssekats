const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const aCategoryDocuments = await Category.find({}, 'id title subcategories')
      .populate('subcategories');
  const aCategories = [];

  aCategoryDocuments.forEach((oCategoryDocument) => {
    const oCategory = oCategoryDocument.toObject();
    const aSubcategories = [];
    oCategory.subcategories.forEach((oSubcategory) => {
      aSubcategories.push({
        id: oSubcategory._id.toString(),
        title: oSubcategory.title,
      });
    });
    aCategories.push({
      id: oCategory._id.toString(),
      title: oCategory.title,
      subcategories: aSubcategories,
    });
  });
  ctx.body = {categories: aCategories};
};
