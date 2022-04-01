async function productDetailsEntry(normal , complex) {
    const productModel = require('../Models/representativeImageModel/representativeImageModel');
    const entry = new Object({
        "productName" : normal.productName,
        "productType" : normal.productType,
        "productImage" : complex
    })
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

module.exports = {productDetailsEntry};
