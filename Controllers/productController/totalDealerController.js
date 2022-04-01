const service = require('../Services/productService/totalDealerService')

function totalBill(req , res) {
    service.totalBill()
    .then(result => {
        if (result) {
            console.log("Your final invoice:-");
            console.log("The total amount to be paid :- " + result.amount);
            console.log("Quantity of each product type :- " + JSON.stringify(result.typequant));
            res.status(200);
            res.send({"Total amount to be paid" : result.amount , "Quantity of each product type" : result.typequant});
        }}
    )
    .catch(err => {
        res.send(err);
    })

}


module.exports = {totalBill};
