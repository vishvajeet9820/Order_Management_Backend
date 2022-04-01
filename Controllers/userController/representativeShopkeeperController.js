const service = require('../Services/userService/representativeShopkeeperService')

function userAdded(req , res) {
    service.userAdded(req.body)
    .then(result => {
        res.status(201);
        res.send(req.body);
    })
} 

module.exports = {userAdded};
