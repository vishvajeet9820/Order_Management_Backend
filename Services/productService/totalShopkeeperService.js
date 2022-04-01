async function totalBill() {
    const productModel = require('../Models/productModel/shopkeeperCartModel');
    const collect = await productModel.find();
    var sum = 0;
    var modelType = {};
    for (let i = 0; i < collect.length; i++) {
        sum += (collect[i].discountPrice * collect[i].Quantity);
        if (collect[i].productType in modelType){
            modelType[collect[i].productType] = ++modelType[collect[i].productType];
        } else {
            modelType[collect[i].productType] = 1;
        }
    }
    result = {amount : sum , typequant : modelType}
    return result;
}


module.exports = {totalBill};
