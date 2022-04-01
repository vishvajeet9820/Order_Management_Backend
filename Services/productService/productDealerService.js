async function fetchItems(prod) {
    const tempModel = require('../Models/productModel/productDealerModel');
    const temp = await tempModel.findOne({productName : prod.productName});
    if (temp !== null && temp.error === undefined) {
        return {"error" : "Product already there in the cart."}
    }
    const productModel = require('../Models/productModel/productCompanyModel');
    const result = await productModel.findOne({productName : prod.productName});
    const related = new Object({
        "productName" : result.productName,
        "MRP" : prod.MRP,
        "discountPercent" : prod.discountPercent,
        "quantity_InStock" : prod.quantity_InStock,
        "productType" : result.productType,
        "productImage" : result.productImage
    });
    return related;

}

async function productDetails(prod) {
    const productModel = require('../Models/productModel/productDealerModel');
    const result = await productModel.findOne({productName : prod});
    return result;
}

async function productDetailsEntry(prod) {
    const productModel = require('../Models/productModel/productDealerModel');
    const entry = await fetchItems(prod);
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

async function productQuantityUpdate(prodChange) {
    const productModel = require('../Models/productModel/productDealerModel');
    const original = await productModel.findOne({productName : prodChange.productName});
    const updated = {
        productName : original.productName,
        MRP : original.MRP,
        discountPercent : original.discountPercent,
        quantity_InStock : original.quantity_InStock + prodChange.quantity_InStock,
        productType : original.productType,
        productImage : original.productImage
    }
    const result = await productModel.updateOne({original} , {$set : updated});
    return result;
}

module.exports = {productDetails , productDetailsEntry , productQuantityUpdate};
