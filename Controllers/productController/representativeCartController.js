const service = require('../Services/productService/representativeCartService')

function productAddedDetails(req , res) {
    let prod = req.query.productName;
    if (!prod) {
        res.send({"error" : "Please provide acurate product name to be searched in the cart"});
    }
    service.productAddedDetails(prod)
    .then(result => {
        if (result) {
            console.log("Your searched product details added in the cart are as follows:-");
            console.log("");
            res.send(result);
        }
        else{
            res.status(404);
            res.send({"error" : "Product not in the cart"});
        }}
    )
    .catch(err => {
        res.status(500);
        res.send({"error" : "there is some problem in the server"});

    })

}

function productAdded(req , res) {
    service.productAdded(req.body)
    .then(result => {
        if (!result.error) {
            console.log("The product " + result.productName +" is added in the cart.")
            res.status(201);
            res.send(result);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
} 

function productRemoved(req , res) {
    let prod = req.query.productName;
    service.productRemoved(prod)
    .then(result => {
        console.log("The product is removed from the cart.")
        res.status(204);
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
} 

function increaseQuantity(req , res) {
    service.increaseQuantity(req.body)
    .then(result => {
        console.log("The quantity of the product " + "'"+req.body.productName+"'" +" is updated in the cart.")
        res.status(204);
        res.send(result);
    })
    .catch(err => {
        res.send({"error" : "We are unable to find the product in the cart."})
    })
}

module.exports = {productAddedDetails , productAdded , productRemoved , increaseQuantity};
