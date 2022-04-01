const service = require('../Services/productService/productCompanyService')

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
        console.log(result);
        res.status(201);
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
} 

module.exports = {productDetails , productDetailsEntry};
