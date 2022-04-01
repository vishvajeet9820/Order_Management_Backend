const service = require('../Services/productService/productDealerService')

function productDetails(req , res) {
    let prod = req.query.productName;
    if (!prod) {
        res.send({"error" : "Please provide acurate product name present in the inventory"});
    }
    service.productDetails(prod)
    .then(result => {
        if (result) {
            console.log("Your searched product details are as follows:-");
            console.log("");
            console.log(result);
            res.send(result);
        }
        else{
            res.status(404);
            res.send({"error" : "Product not in the inventory"});
        }}
    )
    .catch(err => {
        res.status(500);
        res.send({"error" : "there is some problem in the server"});

    })

}

function productDetailsEntry(req , res) {
    service.productDetailsEntry(req.body)
    .then(result => {
        res.status(201);
        res.send(req.body);
    })
    .catch(err => {
        res.send(err);
    })
} 

function productQuantityUpdate(req , res) {
    service.productQuantityUpdate(req.body)
    .then(result => {
        console.log("The quantity of the product " + "'"+req.body.productName+"'" +" is updated in the inventory.")
        res.status(204);
        res.send(result);
    })
    .catch(err => {
        res.send({"error" : "We are unable to find the product in the inventory."})
    })
}

module.exports = {productDetails , productDetailsEntry , productQuantityUpdate};
