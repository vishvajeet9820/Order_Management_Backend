const service = require('../Services/productService/representativeVisitDetailsService')

function productAddedDetails(req , res) {
    let prod = req.query.shopId;
    if (!prod) {
        res.send({"error" : "Please provide acurate shopId to be searched in the list"});
    }
    service.productAddedDetails(prod)
    .then(result => {
        if (result) {
            console.log("Your searched shopId details added in the list are as follows:-");
            console.log("");
            res.send(result);
        }
        else{
            res.status(404);
            res.send({"error" : "shopId not in the list"});
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
            console.log("The shopId " + result.shopId +" is added in the list.")
            res.status(201);
            res.send(result);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
} 

function increaseQuantity(req , res) {
    service.increaseQuantity(req.body)
    .then(result => {
        res.status(204);
        res.send(result);
    })
    .catch(err => {
        res.send({"error" : "We are unable to find the shopId in the list."})
    })
}

module.exports = {productAddedDetails , productAdded , increaseQuantity};
