async function fetchItems(prod) {
    const tempModel = require('../Models/productModel/shopkeeperCartModel');
    const temp = await tempModel.findOne({productName : prod.productName});
    if (temp !== null && temp.error === undefined) {
        return {"error" : "Product already there in the cart."}
    }
    const productModel = require('../Models/productModel/productDealerModel');
    const result = await productModel.findOne({productName : prod.productName});
    const related = new Object({
        "shopId" : prod.shopId,
        "shopkeeper" : prod.shopkeeper,
        "shopName" : prod.shopName,
        "productName" : result.productName,
        "MRP" : result.MRP,
        "discountPrice" : (result.MRP * (1 - (result.discountPercent * 0.01))),
        "Quantity" : 1,
        "productType" : result.productType
    });
    return related;

}

async function productAddedDetails(prod) {
    const productModel = require('../Models/productModel/shopkeeperCartModel');
    const result = await productModel.findOne({productName : prod});
    return result;
}

async function productAdded(prod) {
    const productModel = require('../Models/productModel/shopkeeperCartModel');
    const entry = await fetchItems(prod);
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

async function increaseQuantity(prodChange) {
    const productModel = require('../Models/productModel/shopkeeperCartModel');
    const original = await productModel.findOne({productName : prodChange.productName});
    const updated = {
        shopId : original.shopId,
        shopkeeper : original.shopkeeper,
        shopName : original.shopkeeper,
        productName : original.productName,
        MRP : original.MRP,
        discountPrice : original.discountPrice,
        Quantity : prodChange.Quantity,
        productType : original.productType,
    }
    const result = await productModel.updateOne({original} , {$set : updated});
    return result;
}

async function productRemoved(prod) {
    const productModel = require('../Models/productModel/shopkeeperCartModel');
    const result = await productModel.deleteOne({productName : prod});
    return result;
}

module.exports = {productAdded , productAddedDetails , productRemoved , increaseQuantity};
