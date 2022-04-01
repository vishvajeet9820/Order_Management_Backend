async function userAdded(entry) {
    const productModel = require('../Models/userModel/userShopkeeperModel');
    entry.addedBy = 'REPRESENTATIVE';
    const productEntry = new productModel(entry)
    const result = await productEntry.save();
    return result;
}

module.exports = {userAdded};
