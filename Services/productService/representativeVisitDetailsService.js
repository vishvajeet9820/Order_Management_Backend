async function fetchItems(prod) {
    const tempModel = require('../Models/productModel/representativeVisitDetailsModel');
    const temp = await tempModel.findOne({shopId : prod.shopId});
    if (temp !== null && temp.error === undefined) {
        return {"error" : "Shopkeeper's entry already there in the list."}
    }
    const productModel = require('../Models/userModel/userShopkeeperModel');
    const result = await productModel.findOne({shopId : prod.shopId});
    const related = new Object({
        "shopId" : result.shopId,
        "shopkeeper" : result.shopkeeper,
        "shopName" : result.shopName,
        "noOfVisit" : 1,
        "totalNoOfProd" : prod.totalNoOfProd,
        "amountToBePaid" : prod.amountToBePaid
    });
    return related;

}

async function productAddedDetails(prod) {
    const productModel = require('../Models/productModel/representativeCartModel');
    const result = await productModel.findOne({shopId : prod});
    return result;
}

async function productAdded(prod) {
    const productModel = require('../Models/productModel/representativeCartModel');
    const entry = await fetchItems(prod);
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

async function increaseQuantity(prodChange) {
    const productModel = require('../Models/productModel/representativeCartModel');
    const original = await productModel.findOne({shopId : prodChange.shopId});
    const updated = {
        shopId : original.shopId,
        shopkeeper : original.shopkeeper,
        shopName : original.shopName,
        noOfVisit : original.noOfVisit + 1,
        totalNoOfProd : prodChange.totalNoOfProd,
        amountToBePaid : prodChange.amountToBePaid
    }
    const result = await productModel.updateOne({original} , {$set : updated});
    return result;
}


module.exports = {productAdded , productAddedDetails , increaseQuantity};
