const service = require('../Services/userService/adminRepresentativeService')

function userAdded(req , res) {
    service.userAdded(req.body)
    .then(result => {
        res.status(201);
        res.send(req.body);
    })
} 

module.exports = {userAdded};
