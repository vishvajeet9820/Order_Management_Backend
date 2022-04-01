async function fetchItems(prodName) {
    const tempModel = require('../Models/productModel/dealerCartModel');
    const temp = await tempModel.findOne(prodName);
    if (temp !== null && temp.error === undefined) {
        return {"error" : "Product already there in the cart."}
    }
    const productModel = require('../Models/productModel/productCompanyModel');
    const result = await productModel.findOne(prodName);
    const related = new Object({
        "productName" : result.productName,
        "MRP" : result.MRP,
        "discountPrice" : (result.MRP * (1 - (result.discountPercent * 0.01))),
        "Quantity" : 1,
        "productType" : result.productType,
        "status" : 'order_to_be_placed'
    });
    return related;

}

async function productAddedDetails(prod) {
    const productModel = require('../Models/productModel/dealerCartModel');
    const result = await productModel.findOne({productName : prod});
    return result;
}

async function productAdded(prodName) {
    const productModel = require('../Models/productModel/dealerCartModel');
    const entry = await fetchItems(prodName);
    if (entry.error) {
        return entry;
    }
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

async function increaseQuantity(prodChange) {
    const productModel = require('../Models/productModel/representativeCartModel');
    const original = await productModel.findOne({productName : prodChange.productName});
    const updated = {
        productName : original.productName,
        MRP : original.MRP,
        discountPrice : original.discountPrice,
        Quantity : prodChange.Quantity,
        productType : original.productType,
        status : original.status
    }
    const result = await productModel.updateOne({original} , {$set : updated});
    return result;
}

async function productRemoved(prod) {
    const productModel = require('../Models/productModel/dealerCartModel');
    const result = await productModel.deleteOne({productName : prod});
    return result;
}

module.exports = {productAdded , productAddedDetails , productRemoved , increaseQuantity};
