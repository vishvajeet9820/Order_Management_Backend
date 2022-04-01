async function fetchItems(prod) {
    const tempModel = require('../Models/productModel/productCompanyModel');
    const temp = await tempModel.findOne({productName : prod.productName});
    if (temp !== null && temp.error === undefined) {
        return {"error" : "Product already there in the inventory."}
    }
    const productModel = require('../Models/representativeImageModel/representativeImageModel');
    const result = await productModel.findOne({productName : prod.productName});
    const related = new Object({
        "productName" : result.productName,
        "MRP" : prod.MRP,
        "discountPercent" : prod.discountPercent,
        "productType" : result.productType,
        "productImage" : result.productImage
    });
    return related;

}

async function productDetails(prod) {
    const productModel = require('../Models/productModel/productCompanyModel');
    const result = await productModel.findOne({productName : prod});
    return result;
}

async function productDetailsEntry(normal) {
    const productModel = require('../Models/productModel/productCompanyModel');
    const entry = await fetchItems(normal);
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

module.exports = {productDetails , productDetailsEntry};
